---
title: Memory Models with Hardware View
category: Coding
date: 03-08-2026
---
# Memory models

To understand the memory barriers we first have to look at the hardware level constraints to understand why do they exist, and what do they do at the hardware level.

## Cache Coherency protocol:
- it manages cache line states to prevent inconsistent or lost data.
- **MESI**: Modified, Exclusive, Shared, Invalid
- Message Types: 
- a) Read: contains physical Address of cacheline to be read.
- b) Read Response: contains data requested by an earlier read message
- c) Invalidate: contains physical address of cache line that is to be invalidated.
- d) Invalidate Acknowledge: The response of cpu after removing the invalide data.
- e) Read Invlidate: combination of read + invalidate message
- f) write back: contains both address and data to be written back to memory.

## Store Buffers:
Que: Why store buffers are required?  
Ans: 
1. CPU0 wants to modify data from CPU1
2. CPU0 will be stalled until data arrives from CPU1.
3. To prevent this unnecessary stalling of writes is to add store buffer.

Process of using the store buffers:
1. CPU0 records its write in store buffer and continues executing.
2. when cacheline arrives from CPU1, the data will be moved from store buffer to cache line.
3. CPU refers to both cache & store buffer to remove any duplicaiton of data.

## Invalidation Queues:
Que: Why use invalidation queue?  
Ans:
1. Invalidate messages take long time, cause they have to make sure that the cache line is actually invalidated, that means more work on the CPU.
2. After Invlidating the cacheline CPU has to send an acknowledgement right away.
3. This consumes a lot of time, what the hardware does instead is it stores all the invalidate messages in a queue and only when the conserning cache line is used only then does it invalidate and acknowledge the cacheline. This lazy work helps to eliminate CPU stalling.


## what to understand from the above hardware architecture?
1. If we want to write / modify data from cacheline, we have to flush all the data from store buffer into the actual cacheline.
2. If we want to read data from cacheline, we have to make sure that we have invlidated all the cachelines that were modified by someone else.

## Read / Write Memory Barriers:
1. Read Memory Barrier:
- Anything in the Invalidate Queue will be processed before any read is performed.
2. Write Memory Barrier:
- All the store buffer writes will be written to the actual cacheline before modifying any other cacheline.

## Memory Barriers in C++:
Now that we have learnt about the hardware beneath and how it works, we can now focus on the C++ memory barriers, and understand what they do, and when to use one.

### std::memory_order_seq_cst (sequential consistency):
- It is the most restrictive memory barrier.
- seq_cst makes the cpu flush and process both the store buffer and the invalidate queue.
- Generally the default option for any atomic update, etc.

### std::memory_order_acquire (Read memory Order):
- This is equivalent to the Read memory order we discussed earlier.
- To process the new data we first need to clear the Invalidate queue, i.e any invalid cacheline in the CPUs cache should be removed, before we access our required cacheline.

### std::memory_order_release (Write memory order):
- This is equivalent to the write memory order we discussed earlier.
- Before we write / modify any data from the cacheline, we want our previous rights to be flushed to the cacheline, so that we do not modify old invlid data.

### std::memory_order_acq_release (Read-modify-write):
- This memory order is generally used when we grab a data and then also modify it.
- It forces the cpu to process the Invlidate Queue and flush the store buffers as well.
- eg: x.fetch_add(200, std::memory_order_acq_release);
- In the above example we fetch the old value of x and modify x by adding 200 to it, hence we need both read and write memory order.

### std::memory_order_relaxed (no fence):
- This memory order is the fastest.
- It does not require any co-ordination from the other CPUs / cores.
- Generally used when the data is owned by the CPU.
- eg: thread_owned_variable.load(std::memory_order_relaxed);
- Since we do not want to co-ordinate with other another thread we can just load and write it with relaxed memory order.

Note: If you have anymore doubts or would like to dive deep into the hardware aspect of Store Buffers and Invlidate Queues, I'll suggest you read the **Memory Barriers: a Hardware view for Software Hackers** paper, it goes in more detail and will answer most of your questions.