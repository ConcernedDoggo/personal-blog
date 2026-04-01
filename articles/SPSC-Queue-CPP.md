---
title: Lock Free Single Producer Single Consumer Queue in C++
category: Coding
date: 01-04-2026
---

# Lock Free Single Producer Single Consumer Ring Buffer

We'll take a look at how to build a Fixed size SPSC Ring Buffer in C++.

Important concepts:
1. Memory Barriers
2. Acquire / Release semantics
3. Why mutexes are slower
4. SPSC Queue - Implementation
4. Calculate latency upto nanosecond level accuracy
---
Memory Barriers and Acquire / Release semantics:
- A compiler usually tries to optimized your instructions by changing the order of instructions to be executed this is not much of a problem in single threaded applications where all the things are synchronous, but handling this in multi-threaded applications is important as this could lead to data race, corruption, etc.
- Memory barriers are flags that say do not rearrange instructions before / after / between this section.
- **seq_cst**: This is the default memory order where no rearranging of instructions occurs, simplest memory ordering but has much overhead compared to other memory barriers.
- **relaxed**: This is the most free and comparitively faster memory barrier, because it has ordering enforcement implemented and compiler is free to rearrange it as it wills to do.
- **aquire**: When you perform a Load with acquire, you are saying: "I am waiting for a signal. Once I see the value I'm looking for, I must be able to see everything that the 'releasing' thread did before it sent that signal."
- **release**: When you perform a Store with release, you are creating a "barrier." You are saying: "Everything I did before this store must be visible to anyone who 'acquires' this variable."

Note: release and acquire are generally used together to pack and unpack the data from an atomic variable.

---

Why mutexes are slower?
- mutexes make the kernel stop anyother thread from accesssing the data for a while, this adds an overhead of putting a lock onto a specific section and blocking other threads from accessing the data. As kernel has to remove the hot critical section data first then add the mutex lock and unlock section from L1 cache for a specific thread making the program behave like single threaded application.

---

SPSC Queue - Implementation
1. SPSC-Queue class and member variables:
```cpp
template <typename T> class SPSCQueue {
private:
  alignas(64) std::atomic<uint64_t> write_pos{0};
  alignas(64) std::atomic<uint64_t> read_pos{0};
  
  // RING_BUFFER_SIZE should be a multiple of 2, eg 2^4, 2^16 etc. for masking
  alignas(64) std::unique_ptr<std::array<T, RING_BUFFER_SIZE>> ring_buffer;


public:
  SPSCQueue()
      : ring_buffer(std::make_unique<std::array<T, RING_BUFFER_SIZE>>()) {}

  bool push(const T &item);
  bool pop(T &item);

  bool isFull(uint64_t writePos, uint64_t readPos) {
    return (writePos - readPos) == RING_BUFFER_SIZE;
  }
  bool isEmpty(uint64_t writePos, uint64_t readPos){
    return writePos == readPos;
  }
}
```
- write_pos: this atomic variable will exclusively be owned by producer thread only.
- read_pos: this atomic variable will exclusively be owned by consumer thread only.
- we add alignas(64) to minimize thread contention by aligning the atomic variables to 64 byte cache line.
- We will return true if push/pop operation was successfull else we'll return false.

---
Push function:
- write_pos atomic variable will be modified by this function.
- acquires read_pos to check if full.
- releases the write_pos variable to notify pop about the update (inter-thread communication)

```cpp
  // push is only called by producer thread
  bool push(const T &item) {

    // relaxed because only this push function is going to update write_pos
    uint64_t writePos = write_pos.load(std::memory_order_relaxed);

    uint64_t readPos = read_pos.load(std::memory_order_acquire);

    if (isFull(writePos, readPos)) {
      // we are in this code means that the queue appears to be full
      return false;
    }

    // masking similar to writePos % size of array;
    auto index = writePos & MASK;

    // dereferrencing the ring_buffer unique_ptr
    auto &buffer = *ring_buffer;
    buffer[index] = std::move(item);

    // releasing to notify our consumer that data is ready to be consumed.
    write_pos.store(writePos + 1, std::memory_order_release);

    return true;
  }
```

---

Pop function:
- modifies read_pos atomic variable
- acquires write_pos
- releases read_pos to notify producer thread about the update.
```cpp
bool pop(T &item) {
    // readPos is relaxed because only pop function modifies the read_pos atomic
    uint64_t readPos = read_pos.load(std::memory_order_relaxed);

    if (isEmpty(write_pos, readPos)) {
      // we are here means the the queue appears to be empty
      return false;
    }

    auto index = readPos & MASK;

    auto &buffer = *ring_buffer;
    // the item is by shared reference and will get the popped value in it.
    item = std::move(buffer[index]);

    // releasing to notify our producer that data has been consumed.
    read_pos.store(readPos + 1, std::memory_order_release);

    return true;
  }
```
--- 
Possible improvements:
- we are acquiring the atomic variables of the opposite thread every time for both push and pop.
- we could cache those beforehand and just use atomic variables when necessary, eg: when we see that we are full by checking the cached_read_pos + write_pos, only then should we acquire the read_pos atomic variable to confirm whether the ring buffer is full or not.
- Try to implement this yourself, if you require reference you can visit my github repository: [SPSC-Queue-CPP](https://github.com/harshal24-chavan/SPSC-Queue-CPP/)