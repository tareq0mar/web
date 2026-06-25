import { useState } from "react";

const topics = [
  {
    id: "ch1",
    title: "Ch 1: Introduction",
    color: "#f59e0b",
    emoji: "🖥️",
    sections: [
      {
        heading: "OS Goals",
        bullets: [
          "Overall goal: Execute user programs",
          "Primary goal: Convenience — it's easier for the user to interact with the OS than with machine language directly",
          "Secondary goal: Efficiency — manage computer resources efficiently",
          "Other goal: Utilization — keep CPU as busy as possible, use memory as much as possible, utilize I/O devices",
          "Throughput: the number of jobs (programs) that finish execution per unit of time — measures computer performance",
        ],
      },
      {
        heading: "Computer Resources",
        bullets: [
          "CPU, Memory, I/O Devices — the OS is responsible for managing all of these",
        ],
      },
      {
        heading: "OS Definition",
        bullets: [
          "A set of algorithms that run the computer machine",
          "OS manages computer resources and MUST manage them efficiently",
        ],
      },
      {
        heading: "Computer Layers (bottom to top)",
        bullets: [
          "1. Physical Devices (chips, wires, power supplies...)",
          "2. Microprogram — primitive software that communicates with physical devices; acts as an Interpreter that fetches and executes machine language (Assembly Language) instructions",
          "3. Machine Language",
          "4. OS",
          "5. Application Packages (Compiler, DB, etc.)",
          "6. User Programs (U1, U2, U3...)",
        ],
      },
      {
        heading: "OS Views (4 perspectives)",
        bullets: [
          "1. Central Program — controls execution of ALL programs → Overall goal",
          "2. Extended Machine — extension of the physical machine (hides complexity, provides clean interface) → Primary goal",
          "3. Resource Manager — manages computer resources efficiently → Secondary goal",
          "4. Kernel — the part of the OS that's ALWAYS running and executing instructions",
        ],
      },
      {
        heading: "History & Early Software",
        bullets: [
          "Early: punch cards (each line needed a card; 200-line program = 200 cards), hexadecimal used",
          "Early software: Machine Language → Assembly Language (Assemblers) → Loaders → Linkers → Compilers",
          "Poor Performance problem: wasted set-up time, no overlap between I/O & CPU execution, Low CPU utilization",
          "Example: card reader reads 1200 cards/min = 20 cards/sec. CPU processes 300 cards/sec. CPU utilization = 4/64 = 1/16 = 6% !",
        ],
      },
      {
        heading: "Evolution: A → B → C → D → E → F → G",
        bullets: [
          "[A] Offline Operation: tape to memory is MUCH faster than card reader to memory → improved execution",
          "[B] Buffering: CPU reaches I/O → brings data from buffer, not card reader. I/O of one job overlapped with SAME job's execution",
          "[C] Spooling: Job Queue/Pool (jobs demanding execution) + Spool Area (jobs needing printing). I/O of one job overlapped with execution of ANOTHER job",
          "[D] Multiprogramming Batch: memory divided into regions/partitions. Each region holds one job. CPU switches to another job when first needs I/O. Uses Context Switch.",
          "[E] Time Sharing: same as multiprogramming + each job gets a time quantum Q. CPU switches when Q expires, I/O needed, job finishes, or higher priority process arrives.",
          "[F] Parallel Systems: multi-processor. Loosely Coupled (networks) or Tightly Coupled (shared memory, clock). Symmetric (each CPU has own OS copy) vs Asymmetric (master CPU controls others).",
          "[G] Realtime Systems: takes data using sensors, for systems needing immediate response",
        ],
      },
      {
        heading: "Multiprogramming vs Time Sharing",
        bullets: [
          "Multi-programming: CPU switches when the job NEEDS I/O",
          "Time Sharing: CPU switches when Quantum Q is FINISHED (in addition to I/O, job completion, high priority)",
          "Multi-programming ≠ Time Sharing",
        ],
      },
      {
        heading: "Job Types in Multiprogramming",
        bullets: [
          "CPU-bound job: contains FEW very LONG CPU bursts",
          "IO-bound job: contains MANY very SHORT CPU bursts",
          "⚠️ Key: Any job/process is a sequence of CPU burst & I/O wait, and it must START and END with a CPU burst",
          "Context Switch: saves registers for Job 1 & reloads registers for Job 2",
        ],
      },
    ],
  },
  {
    id: "ch2",
    title: "Ch 2: Computer System Operations",
    color: "#ef4444",
    emoji: "⚡",
    sections: [
      {
        heading: "Device Controllers & I/O",
        bullets: [
          "Each device controller is in-charge of a particular device and has a LOCAL BUFFER",
          "I/O can run CONCURRENTLY with the CPU",
          "CPU moves data from/to main memory to/from local buffers",
          "I/O is from the device to the local buffer of the controller",
          "Device controller informs CPU it finished by causing an INTERRUPT",
          "Operating Systems are interrupt driven (CPU is interrupted)",
        ],
      },
      {
        heading: "Interrupt Handling",
        bullets: [
          "Interrupt = a signal sent to the CPU by hardware or software ('Trap')",
          "Examples: Completion of I/O (hardware), Division by Zero (software), Invalid Memory Access (hardware), Request of OS service",
          "Interrupt Vector (Table): table in OS mapping interrupt number → address of service routine",
          "Flow: device finishes → sends interrupt [45] → CPU (if not busy/high priority) → looks up interrupt vector[45] = 25164 → jumps to address 0x25164 → executes service routine",
          "By Polling: CPU periodically checks device status registers instead of waiting for interrupt",
        ],
      },
      {
        heading: "Types of I/O",
        bullets: [
          "Synchronous I/O: after I/O starts, CPU WAITS until I/O completes before returning to program. CPU is idle (wait instruction, loop: jump loop). Control returns only upon completion.",
          "Asynchronous I/O: after I/O starts, CPU switches to ANOTHER program WITHOUT waiting for I/O completion.",
        ],
      },
      {
        heading: "Direct Memory Access (DMA)",
        bullets: [
          "Problem: slow I/O device (keyboard) → 1 char every 1 ms = 1000 mics. CPU handles interrupt in 2 mics → 998 mics free (enough for other tasks). OK!",
          "Problem: fast I/O device (hard disk) → 1 char every 4 mics. CPU needs 2 mics to handle → only 2 mics left. NOT ENOUGH for context switching!",
          "DMA solution: OS sends ONE BLOCK of data each time + sends interrupt to CPU to process this block. CPU only interrupted once per block, not once per character.",
        ],
      },
      {
        heading: "Primary Storage (RAM) — 'volatile'",
        bullets: [
          "Largest storage media accessed directly by CPU",
          "Memory = array of words, each with an address. Word size = 2-8 bytes (most common: 4 bytes)",
          "Load Instruction: fetch instruction from memory to IR (Instruction Register)",
          "Store Instruction: storing a register value into a memory location",
        ],
      },
      {
        heading: "Instruction Cycle",
        bullets: [
          "1. Fetch instruction from memory to IR",
          "2. Decode (analyze instruction)",
          "3. Perform the operation with given operands",
          "4. Store the result",
          "ICR (Instruction Cache Register): stores next instruction — fetching from ICR to IR is MUCH faster than from RAM to IR",
          "Steps 1 (fetch to ICR) and 2 (decode from ICR to IR) are CONCURRENT (parallel)",
        ],
      },
      {
        heading: "Secondary Storage",
        bullets: [
          "Hard Disks, Tapes, CDs, Flash Memory...",
          "Factors: Speed, Cost, Volatility",
          "Storage speed hierarchy (fastest → slowest): Register → Caches → RAM → HD → Tapes → etc.",
          "Caching: copying data to a faster storage medium to speedup execution and ensure good performance",
          "L1 Cache: fastest, built inside CPU. L2: bigger but slower. Memory (RAM) is cache for HD. Registers are cache for Memory.",
        ],
      },
      {
        heading: "Hardware Protection",
        bullets: [
          "Dual Mode of Operation: Monitor/Supervisor Mode (OS executes on behalf of itself, e.g. interrupts) vs User Mode (OS executes on behalf of user programs)",
          "Mode bit: 1 = user mode, 0 = monitor mode",
          "Privileged Instruction: an instruction that ONLY executes in monitor mode",
          "I/O Protection: ALL I/O instructions are privileged instructions",
          "Memory Protection: uses Base Register (starting address) + Limit Register (size). PA = LA + Base. If LA ≥ Limit → Memory Fault",
          "CPU Protection: Timer — decremented by 1 every clock tick. When it reaches 0 → sends interrupt to CPU → service routine checks CPU usage. Timer can also be used for computer time calculation.",
        ],
      },
      {
        heading: "OS Structure",
        bullets: [
          "1. Process Management",
          "2. Memory Management",
          "3. File System (I/O) Management",
          "OS services can be provided in 2 methods: System Call (assembly language instruction) or System Programs",
        ],
      },
    ],
  },
  {
    id: "ch3",
    title: "Ch 3: Processes",
    color: "#10b981",
    emoji: "⚙️",
    sections: [
      {
        heading: "Process Definition",
        bullets: [
          "A process is a program in execution. [process ≡ program ≡ job]",
          "Process contains: Code Section (PC = address of instruction currently executing), Data Section (where input/output data is stored), Stack Section (global variables — static)",
        ],
      },
      {
        heading: "Process Types",
        bullets: [
          "1. Batch Process — generally low priority",
          "2. Time Sharing Process — Users, Program Development, Data Entry, Gaming",
          "3. System Tasks — such as Interrupt handling",
        ],
      },
      {
        heading: "Process States (5 states)",
        bullets: [
          "NEW: process is newly created",
          "READY: process loaded into memory, ready to run, waiting in READY queue for CPU",
          "RUNNING: process is executing on CPU",
          "WAITING: waiting for some event (typically I/O)",
          "TERMINATED: process finished execution",
          "Transitions: NEW→READY (admitted), READY→RUNNING (CPU scheduling), RUNNING→WAITING (I/O needed), WAITING→READY (I/O completed), RUNNING→READY (interrupt/Q finished), RUNNING→TERMINATED (exit)",
        ],
      },
      {
        heading: "Process Control Block (PCB)",
        bullets: [
          "A data structure (usually a table) that stores all process information",
          "Contains: Process ID, Process State, PC (Program Counter), Registers, Scheduling info, Memory info (Base & Limit Registers), Accounting Info",
        ],
      },
      {
        heading: "Scheduling Queues",
        bullets: [
          "Job Queue / Pool: all jobs waiting to enter memory",
          "Ready Queue: processes in memory, waiting for CPU",
          "I/O Queue (HD Queue): processes waiting for I/O to complete",
          "Queue uses scheduling algorithm (FIFO typically)",
        ],
      },
      {
        heading: "Types of Scheduling",
        bullets: [
          "Long-Term (Job) Scheduling: selects job from Job Queue → admits to memory → adds to Ready Queue. Invoked in seconds/minutes. OS has time to decide carefully. Controls DEGREE OF MULTIPROGRAMMING.",
          "Short-Term (CPU) Scheduling: selects process from Ready Queue → gives to CPU. Invoked in milliseconds/microseconds/nanoseconds. Must be VERY FAST.",
          "Medium-Term Scheduling: can swap processes in/out of memory (Intermediate Queue)",
          "Degree of Multiprogramming = number of jobs in memory (Ready Queue)",
        ],
      },
      {
        heading: "Job Scheduling Balance",
        bullets: [
          "If most jobs are CPU-bound → CPU always busy ('High CPU Utilization') BUT I/O queues are EMPTY → UNBALANCED",
          "If most jobs are IO-bound → I/O queues always full BUT CPU almost free ('Low CPU Utilization') → UNBALANCED",
          "Long-Term Scheduling selects a MIX of CPU & I/O bound jobs → reasonably balanced system",
        ],
      },
      {
        heading: "Process Creation",
        bullets: [
          "Parent process creates children processes → forming a TREE of processes",
          "Resource Sharing options: parent & children share all, children share subset, or share NO resources (compete for all)",
          "Execution options: parent & children execute concurrently, OR parent waits until child terminates",
          "Address Space: child duplicate of parent, OR child has a new program loaded into it",
          "Unix: fork() creates new process. execve() replaces process memory space after fork.",
        ],
      },
      {
        heading: "Process Termination",
        bullets: [
          "Process executes last statement → asks OS to delete it ('exit'). Output data sent to parent via fork. Resources deallocated.",
          "Parent may abort child when: task no longer required, child exceeded allocated resources, parent is exiting",
          "Cascading Termination: if parent exits → ALL children & sub-children are forced to exit",
          "OS doesn't allow child to continue if parent terminates",
        ],
      },
      {
        heading: "Cooperating Processes",
        bullets: [
          "Independent process: cannot affect or be affected by other processes",
          "Cooperating process: CAN affect or be affected by other processes",
          "Advantages: Information sharing, Computation speed-up, Modularity, Convenience",
        ],
      },
      {
        heading: "Producer-Consumer Problem",
        bullets: [
          "Producer produces information. Consumer consumes it. Buffer in between.",
          "Circular Buffer: Full when (in+1)%n == out. Empty when in == out.",
          "Disadvantage: only use n-1 buffer slots when n buffers exist",
          "Examples: Print program → characters → Printer. Compiler → assembly code → Assembler. Assembler → machine code → Loader.",
        ],
      },
    ],
  },
  {
    id: "ch4",
    title: "Ch 4: Threads",
    color: "#6366f1",
    emoji: "🧵",
    sections: [
      {
        heading: "Process vs Thread",
        bullets: [
          "Process (Heavily Weight Process): has Code Section, Data Section, Operand files, PID, Register Set, Stack Section, PC",
          "Thread (Light Weight Process): contains Program Counter, Register Set, Stack Section ONLY",
          "All peer threads SHARE: Code Section, Data Section, I/O Resources",
          "Advantages of Threads: Concurrency & Sharing Resources",
        ],
      },
      {
        heading: "Two Kinds of Thread Support",
        bullets: [
          "At User Level: totally responsibility of user (very complex & difficult)",
          "At Kernel Level: most OS support this kind (preferred)",
          "Think of user threads as processes (programs). Think of kernel threads as CPUs.",
        ],
      },
      {
        heading: "User & Kernel Thread Relationships",
        bullets: [
          "Many-to-One: many user threads mapped to ONE kernel thread. Disadvantage: NO Concurrent Execution",
          "One-to-One: each kernel thread assigned to ONE user thread. Main advantage: allows CONCURRENT execution. Disadvantage: need enough kernel threads.",
          "Many-to-Many: many user threads mapped to EQUAL OR SMALLER number of kernel threads.",
        ],
      },
    ],
  },
  {
    id: "ch5",
    title: "Ch 5: CPU Scheduling",
    color: "#f97316",
    emoji: "🗓️",
    sections: [
      {
        heading: "CPU Scheduling Definition",
        bullets: [
          "The process/decision of which process the OS selects from the ready queue to give to the CPU [short-term scheduling]",
          "Cases 1 & 4 (I/O required, process terminated): Non-preemptive (CPU releases voluntarily)",
          "Cases 2 & 3 (interrupt, I/O completed in synchronous mode): Preemptive (CPU taken forcefully)",
        ],
      },
      {
        heading: "Scheduling Criteria (optimize these)",
        bullets: [
          "CPU Utilization — MAXIMIZE",
          "Throughput — MAXIMIZE (jobs completed per unit time)",
          "Turnaround Time — MINIMIZE: Finish Time − Arrival Time",
          "Waiting Time — MINIMIZE: Turnaround Time − Service (CPU) Time",
          "Response Time: time from submitting job until first response from computer",
          "Weighted Turnaround Time = Turnaround Time / Service (CPU) Time",
          "Context switch between Pi and Pj needs 2 context switches",
        ],
      },
      {
        heading: "[1] FCFS — First Come First Serve",
        bullets: [
          "Jobs served in order of arrival. Simple FIFO queue.",
          "Non-preemptive",
          "Convoy Problem: one slow process blocks everyone behind it → very poor average waiting time",
          "Example: P1(arr=0,srv=3), P2(arr=2,srv=5), P3(arr=4,srv=1), P4(arr=5,srv=4), P5(arr=8,srv=1)",
          "ATT = [(3-0)+(8-2)+(9-4)+(13-5)+(14-8)]/5 = 5.6 units",
          "AWT = [(3-0-3)+(8-2-5)+(9-4-1)+(13-5-4)+(14-8-1)]/5 = 2.8 units",
        ],
      },
      {
        heading: "[2] SJF — Shortest Job First",
        bullets: [
          "CPU given to process with SMALLEST CPU burst (Service Time). Gives MINIMUM (optimal) waiting time.",
          "Two versions: Preemptive (SRTF: if new job arrives with shorter remaining time → preempt current) and Non-Preemptive (CPU continues current job, then switches)",
          "Problem: Starvation (long jobs may never run). Solution: Aging (as time progresses, give process some priority)",
          "Major Problem: How does OS know the LENGTH of next CPU burst? It can only ESTIMATE.",
          "Estimation formula: Y(n+1) = w × T(n) + Y(n) × (1-w), where 0 ≤ w ≤ 1",
          "w=0: Y(n+1) = Y(n) (ignore recent, use only history). w=1: Y(n+1) = T(n) (ignore history, use only recent)",
          "Expanded with w=1/2: Y(n+1) = T(n)/2 + T(n-1)/4 + T(n-2)/8 + T(n-3)/16 + ...",
        ],
      },
      {
        heading: "[3] Priority Scheduling",
        bullets: [
          "CPU given to process with highest priority. Low number = low priority (system tasks have HIGH priority, e.g. interrupts)",
          "Two versions: Preemptive and Non-Preemptive",
          "Problem: Starvation. Solution: Aging.",
          "Example (High # = High Priority): P1(srv=10,pri=1), P2(srv=5,pri=2), P3(srv=1,pri=5), P4(srv=8,pri=4)",
        ],
      },
      {
        heading: "[4] Round Robin (RR)",
        bullets: [
          "Best designed for time sharing. Each process gets a time slice called Quantum Q.",
          "Process runs for Q, then CPU switches to next process on FCFS basis.",
          "If Q very big → behaves like FCFS. If Q very small → too many context switches (overhead!)",
          "Example Q=20: P1(srv=53), P2(srv=17), P3(srv=68), P4(srv=24) → Order: P1,P2,P3,P4,P1,P3,P4,P1,P3,P1,P3 finishing at times 20,37,57,77,97,117,121,141,161,164,172",
        ],
      },
      {
        heading: "[5] Multi-Level Queues",
        bullets: [
          "Ready queue divided into several queues, each with its own scheduling algorithm",
          "Scheduling between queues: Time Slice (each queue gets a CPU time slice) or Fixed Priority (serve all system → interactive → batch)",
          "Example: System Tasks (RR, Q=100, 400ms), Interactive Jobs (RR, Q=10, 100ms), Batch Jobs (FCFS, 20ms)",
          "Problem: Starvation",
        ],
      },
      {
        heading: "[6] Multi-Level Feedback Queues",
        bullets: [
          "Process CAN move up & down between queues (unlike fixed Multi-Level Queues)",
          "Example: Q1→RR Q=10, Q2→RR Q=100, Q3→FCFS. New process enters Q1.",
          "Example: P1(25), P2(160), P3(120), P4(8) → Timeline: 0→P1(10)→P2(20)→P3(30)→P4(38,done)→P1(53,done)→P2(153)→P3(253)→P2(303,done)→P3(313,done)",
          "Algorithm Evaluation: Deterministic (poor) → Queuing Theory (theoretical) → Simulation (good) → Implementation (best)",
        ],
      },
      {
        heading: "Key Formulas",
        bullets: [
          "Turnaround Time = Finish Time − Arrival Time",
          "Waiting Time = Turnaround Time − Service (CPU) Time",
          "Weighted Turnaround Time = Turnaround Time / Service (CPU) Time (minimum is better)",
          "Avg Turnaround Time = sum of all turnaround times / n",
          "Avg Waiting Time = sum of all waiting times / n",
        ],
      },
    ],
  },
  {
    id: "ch6",
    title: "Ch 6: Concurrent Processes & Synchronization",
    color: "#ec4899",
    emoji: "🔄",
    sections: [
      {
        heading: "Concurrent Processes",
        bullets: [
          "Concurrent process: either independent or cooperating",
          "Independent: can't affect or be affected by the processors",
        ],
      },
      {
        heading: "Precedence Graph",
        bullets: [
          "A directed graph whose nodes correspond to statements",
          "Edge from Si to Sj means Sj can ONLY be executed AFTER Si completes",
          "Concurrent execution possible only when Bernstein's conditions are satisfied",
        ],
      },
      {
        heading: "Bernstein's Concurrency Conditions",
        bullets: [
          "R(Si) = read set: all variables REFERENCED by Si during execution",
          "W(Si) = write set: all variables CHANGED (written) by Si during execution",
          "S1 and S2 can execute concurrently if ALL three conditions hold:",
          "① R(S1) ∩ W(S2) = Φ  AND  ② W(S1) ∩ R(S2) = Φ  AND  ③ W(S1) ∩ W(S2) = Φ",
          "Example: S1: a=x+y → R={x,y}, W={a}; S2: b=z+1 → R={z}, W={b} → all intersections are empty → CAN execute concurrently",
          "Example: S3: c=a-b → R(S3)∩W(S2) = {a,b}∩{b} = {b} ≠ Φ → CANNOT execute concurrently with S2",
        ],
      },
      {
        heading: "Fork & Join Constructs",
        bullets: [
          "Fork L: produces two concurrent executions. One starts at label L, other continues after fork.",
          "Join: recombines two concurrent computations. count = count - 1. If count ≠ 0: quit this computation.",
          "Join for two computations must execute ATOMICALLY (cannot execute concurrently — would give wrong count)",
          "Parbegin/Parend: all statements between them execute concurrently (higher-level than fork/join)",
        ],
      },
      {
        heading: "Process Synchronization — Race Condition",
        bullets: [
          "Race Condition: several processes access and manipulate data concurrently, outcome depends on particular order of access",
          "counter = counter + 1 compiles to: register1 = counter; register1 = register1+1; counter = register1",
          "If producer and consumer both do counter++ and counter-- concurrently → can get wrong result",
          "Solution: Critical Section — access shared data in critical section, execute ATOMICALLY",
        ],
      },
      {
        heading: "Critical Section Problem — Solution Requirements",
        bullets: [
          "1. Mutual Exclusion: if Pi is in its critical section, NO other process can be in THEIR critical section. ('One process at a time')",
          "2. Progress: if no process is in critical section AND some want to enter → selection CANNOT be postponed indefinitely. ('If CS is free and process wants it, it can get it')",
          "3. Bounded Waiting: bound on number of times other processes enter CS after a process has requested entry",
          "Assume: each process executes at nonzero speed. No assumption about relative speeds of n processes.",
        ],
      },
      {
        heading: "Software Solutions",
        bullets: [
          "Algorithm 1 (turn variable): Mutual Exclusion ✅, Bounded Waiting ✅ (waits at most 1 go), Progress ❌ (strict alternation — if P0 goes into long remainder, P1 can't enter CS again)",
          "Algorithm 2 (flag[] array): Both set flags true → INFINITE LOOP. Progress ❌, Mutual Exclusion might fail.",
          "Algorithm 3 (Peterson's — flag[] + turn): Satisfies ALL THREE requirements for 2 processes. 'flag' = I want to enter. 'turn' = resolves conflict when both want to enter simultaneously.",
          "Drawbacks of software solutions: complicated to program, busy waiting (wasted CPU cycles), more efficient to BLOCK waiting processes",
        ],
      },
      {
        heading: "Semaphores (OS Solution)",
        bullets: [
          "Semaphore S: integer variable accessed via two ATOMIC operations only",
          "Wait(S): while(s≤0){do nothing}; s = s-1  — checks if CS is empty",
          "Signal(S): S = S+1  — opens the critical section",
          "Implementation with blocking (no busy wait): S has value + list L. Wait: S.value--; if S.value<0 → add to S.L; block. Signal: S.value++; if S.value≤0 → remove P from S.L; wakeup(P)",
          "mutex semaphore = 1: Repeat{wait(mutex); critical section; signal(mutex); remainder}Forever",
        ],
      },
      {
        heading: "Classical Synchronization Problems",
        bullets: [
          "1. Bounded Buffer: semaphore full=0, empty=n, mutex=1. Producer: wait(empty), wait(mutex), add, signal(mutex), signal(full). Consumer: wait(full), wait(mutex), remove, signal(mutex), signal(empty).",
          "2. Readers-Writers: readcount tracks # readers. First reader does wait(wrt), last reader does signal(wrt). Writers: wait(wrt)...signal(wrt). Multiple readers allowed simultaneously, writer needs exclusive access.",
          "3. Dining Philosophers: 5 philosophers, 5 chopsticks. wait(chopstick[i]); wait(chopstick[(i+1)%5]); eat(); signal(chopstick[i]); signal(chopstick[(i+1)%5]). Problems: Deadlocks & Starvation.",
        ],
      },
    ],
  },
  {
    id: "ch7",
    title: "Ch 7: Deadlocks",
    color: "#dc2626",
    emoji: "🔐",
    sections: [
      {
        heading: "Deadlock Definition",
        bullets: [
          "Two processes are deadlocked if every process is holding a resource AND waiting for another process to release its resource",
          "A set of WAITING (blocked) processes, each holding a resource & waiting for others to release resources",
          "Requires a CYCLE in the Resource Allocation Graph",
        ],
      },
      {
        heading: "System Model",
        bullets: [
          "Resource types: R0, R1, ..., Rn-1. Each type Ri has Wi instances.",
          "Each process uses resources in order: Request → Use → Release",
        ],
      },
      {
        heading: "Deadlock Handling",
        bullets: [
          "Method 1: Allow system to enter deadlock, then RECOVER from it (UNIX approach)",
          "Method 2: OS PREVENTS system from entering deadlock state",
        ],
      },
      {
        heading: "4 Necessary Conditions for Deadlock",
        bullets: [
          "1. Mutual Exclusion: resource type must be used exclusively (can't be shared)",
          "2. Hold & Wait: process holds a resource AND waits for another process to release another resource",
          "3. Non Pre-emption: cannot forcefully remove any resource from a process",
          "4. Circular Wait: cycle exists (P1 waits for P2's resource, P2 waits for P1's resource)",
          "⚠️ ALL FOUR must hold simultaneously for deadlock to occur",
        ],
      },
      {
        heading: "Resource Allocation Graph",
        bullets: [
          "V = {P: processes} ∪ {R: resources}",
          "Edge (Pi, Rj): process Pi is REQUESTING one instance of resource Rj",
          "Edge (Rj, Pi): one instance of resource Rj is ALLOCATED to process Pi",
          "If NO cycle → no deadlock. If cycle exists → MAY be deadlock (deadlock if each resource has only 1 instance)",
        ],
      },
      {
        heading: "Deadlock Prevention",
        bullets: [
          "Make sure at least ONE of the 4 conditions doesn't hold:",
          "1. Mutual Exclusion: some resources are inherently exclusive (printers) → can't do much",
          "2. Hold & Wait: (i) let process request ALL resources at beginning, OR (ii) process only gets resources when it has NONE. Problem: Starvation",
          "3. Non Pre-emption: if process requests unavailable resource → it must RELEASE all currently held resources",
          "4. Circular Wait: impose ordering on resources (Card Reader < HD < Tape < Printer). Process can only request higher-numbered resource.",
        ],
      },
      {
        heading: "Deadlock Avoidance — Safe State",
        bullets: [
          "Safe state: sequence <P0, P1, ..., Pn-1> exists such that each Pi can get all needed resources from available + resources released by previous processes",
          "If safe sequence exists → system is SAFE (no deadlock). If not → UNSAFE (may lead to deadlock).",
          "Strategy: only grant resource requests that keep system in safe state",
        ],
      },
      {
        heading: "Banker's Algorithm (single resource type)",
        bullets: [
          "Each process declares MAX needs at beginning. When process requests, it might have to wait. When gets all, must release in finite time.",
          "Data: max[i], allocation[i], NEED[i] = max[i] - allocation[i], Available = W",
          "Algorithm: let W = available. Find i where K[i]=1 AND NEED[i]≤W. Set W = W + allocation[i], K[i]=0, go to step 3. If K[i]=0 for all i → safe. Else → not safe.",
          "Example: P0(max=10,alloc=5,need=5), P1(max=4,alloc=2,need=2), P2(max=9,alloc=2,need=7). Available=3. Safe: <P1,P0,P2>",
        ],
      },
      {
        heading: "Banker's Algorithm (multiple resource types)",
        bullets: [
          "Available[j], Max[i][j], Allocation[i][j], Need[i][j] = Max[i][j] - Allocation[i][j]",
          "Safe sequence found by repeatedly finding a process Pi where Need[i] ≤ Available, then adding Allocation[i] to Available",
          "Example with 3 resource types (A,B,C): find safe sequence by checking which process needs can be satisfied with current available",
        ],
      },
    ],
  },
  {
    id: "ch8",
    title: "Ch 8: Memory Management",
    color: "#0ea5e9",
    emoji: "💾",
    sections: [
      {
        heading: "Logical vs Physical Address",
        bullets: [
          "Logical Address (LA): address seen in your program — the OFFSET of the instruction in your program",
          "Physical Address (PA): the ACTUAL address in memory",
          "PA = LA + Base Register",
          "Ordinary memory system: all programs must be admitted (allocated to memory) before execution starts",
        ],
      },
      {
        heading: "Binding Times",
        bullets: [
          "1. At Compilation Time: PAs assigned at start → program must load at SAME location every time, can't change location during execution",
          "2. At Loading Time: PAs decided when program is LOADED into memory. Problem: program can't be moved during execution",
          "3. At Execution Time: 'Best' — PAs determined during execution (most flexible)",
          "Objective: compute/calculate the PA so CPU can fetch the instruction or data",
        ],
      },
      {
        heading: "[1] Contiguous Allocation",
        bullets: [
          "Memory divided into partitions/regions. Each region holds ONE process. When region frees → new program loads.",
          "Hardware support: Base Register + Limit Register",
          "PA = LA + Base Register",
          "If LA ≥ Limit → Memory Fault (protection violation)",
        ],
      },
      {
        heading: "Memory Management Algorithms",
        bullets: [
          "(1) Fixed Regions (IBM MFT): memory divided into FIXED number of regions/sizes. Each region = one job. Degree of multiprogramming bounded by # regions.",
          "Scheduling in fixed regions: (a) each region has own queue, (b) one queue for all",
          "Scheduling algorithms: FCFS with/without skip, Best Fit only, Best Available Fit",
          "Problems: Internal Fragmentation (unused memory INSIDE region) + External Fragmentation (regions too small for any waiting job)",
          "(2) Dynamic (Variable) Regions: job gets exactly the memory it needs. After time, memory has allocated regions + holes (external fragmentation).",
          "Job scheduling: First Fit, Best Fit, Worst Fit. Problem: External Fragmentation.",
        ],
      },
      {
        heading: "[2] Non-Contiguous Memory — Paging",
        bullets: [
          "Logical program divided into equal-size partitions called PAGES",
          "Physical memory divided into equal-size partitions called FRAMES",
          "Page Table: maps page number → frame number",
          "LA → P (page number) = LA / Page Size, D (offset) = LA % Page Size",
          "PA = F × Page Size + D (where F = frame number from page table)",
          "In practice: page size = 2^n bytes → low n bits of LA = d (offset), remaining bits = P (page number). NO division needed!",
          "Note: /, % are multiplication operations and take time → OS does NOT actually perform division for each instruction!",
        ],
      },
      {
        heading: "Page Table Implementation",
        bullets: [
          "(1) Registers: only if page size is small (page table must fit in registers)",
          "(2) Memory: PTBR (Page Table Base Register) + PTLR (Page Table Limit Register). Problem: 2 memory accesses needed (1 for page table, 1 for instruction itself).",
          "(3) Memory + Registers (Associative Registers / TLB): small fast cache of (Page#, Frame#) pairs. Performance depends on Hit Ratio h.",
          "EAT = h(m+t) + (1-h)(2m+t) where m=memory access time, t=associative register search time, h=hit ratio",
          "Example: m=100ns, t=1ns, h=0.95 → EAT = 0.95(1+100) + 0.05(200+1) = 106ns",
        ],
      },
      {
        heading: "Page Table Size Problem",
        bullets: [
          "Example: LA=32bit, page size=2^12 → P=20bits → page table has 2^20 entries × 4bytes = 4MB just for page table!",
          "LA=40bit, page size=2^12 → page table = 2^28 × 4 = 1GB per process!",
          "LA=48bit → page table = 2^36 × 4 = 256GB!",
          "Solution: Multi-Level Page Table → divide page table itself into pages",
        ],
      },
      {
        heading: "Multi-Level Page Table",
        bullets: [
          "LA = P1 | P2 | d (for 2-level). P1 indexes outer page table → address of inner page table. P2 indexes inner page table → frame number F. PA = F×PageSize + d.",
          "Example LA=32bit, page size=2^12: P1=8bits, P2=12bits, d=12bits. Outer table: 2^8×4=1KB. Inner table: 2^12×4=16KB.",
          "Trade-off: more levels = more memory accesses (2-level → 3 accesses; 4-level → 5 accesses)",
          "BUT with good associative register algorithm, performance remains good",
        ],
      },
      {
        heading: "[3] Segmentation",
        bullets: [
          "User program divided into logical units called SEGMENTS (Main Program, Stack, Data structures, Functions...)",
          "Segment Table: maps segment number S → Base (B) and Length (L)",
          "LA = S | d. PA = B + d. If d > L → Memory Fault.",
          "Example: S=2, d=350, B=18000 → PA = 18000+350 = 18350",
          "Segmentation with Paging: combine both — each segment is divided into pages",
          "LA = S | P | d. S → page table address. P → frame F. PA = F×PageSize + d.",
        ],
      },
      {
        heading: "Memory Protection in Paging",
        bullets: [
          "Legal/Illegal Bit in page table: 0=illegal page, 1=legal page",
          "R/W Bit: 0=read only, 1=read & write",
          "Paging Advantages: sharing pages — multiple users can point to same frame (e.g. shared code/libraries)",
          "Paging Disadvantage: program divided into too many pieces in memory",
        ],
      },
    ],
  },
  {
    id: "ch9",
    title: "Ch 9: Virtual Memory",
    color: "#7c3aed",
    emoji: "🌀",
    sections: [
      {
        heading: "Virtual Memory — Big Idea",
        bullets: [
          "How to run bigger programs on smaller memory?",
          "Only the part of the program needed is loaded into memory (not the whole program)",
          "Mechanism: Demand Paging",
        ],
      },
      {
        heading: "Demand Paging",
        bullets: [
          "Each page table entry has a V/i Bit (Valid/Invalid): 1 = in memory ('Valid'), 0 = not in memory ('Invalid')",
          "CPU checks V/i bit for every LA. If valid → continue. If V/i=0 → PAGE FAULT occurs.",
          "On page fault: OS looks for free frame → swaps required page from HD → updates page table → resumes execution",
          "If NO free frame: select VICTIM frame → maybe swap it out to HD → swap in required page → update page table → resume",
        ],
      },
      {
        heading: "Performance of Demand Paging",
        bullets: [
          "P = page fault rate (0 ≤ P ≤ 1). P=0: no faults. P=1: every instruction causes a fault.",
          "Page fault overhead = Swap_in + Maybe Swap_out + m",
          "EAT = (1-P) × m + P × page fault overhead",
          "Example: m=10mics, page transfer=10ms=10,000mics, 40% of time page needs swap-out",
          "EAT = (1-P)×10 + P×(10×1000 + 0.4×10×1000 + 10) = 10 + 14000P ≈ 14000P",
          "Result: Performance depends heavily on P (page fault rate) → MINIMIZE page fault rate",
        ],
      },
      {
        heading: "Dirty Bit",
        bullets: [
          "Added to page table to indicate if page was modified",
          "1 = modified (must write back to HD before replacing). 0 = not modified (can replace without writing back).",
        ],
      },
      {
        heading: "[1] FIFO Page Replacement",
        bullets: [
          "Replace page that entered memory FIRST (oldest page in memory)",
          "Example (3 frames): 1,2,3,4,1,2,5,1,2,3,4,5 → 9 page faults",
          "Example (4 frames): same sequence → 10 page faults (MORE faults with MORE frames!)",
          "Belady's Anomaly: more frames can cause MORE page faults with FIFO",
        ],
      },
      {
        heading: "[2] Optimal Replacement",
        bullets: [
          "Replace page that will NOT be used for the LONGEST period in the FUTURE",
          "Same example (3 frames) → 7 page faults (minimum possible)",
          "Problem: How can OS know which pages will be used in the future? → IMPOSSIBLE in practice",
          "Used as a BENCHMARK to compare other algorithms",
        ],
      },
      {
        heading: "[3] LRU — Least Recently Used",
        bullets: [
          "Replace page not used for LONGEST period in the PAST",
          "3 frames example → 10 page faults. 4 frames → 8 page faults.",
          "Implementation 1: Counter — page table has last-time-referenced column (timestamp). Replace smallest timestamp.",
          "Implementation 2: Queue of referenced pages — most recent at front, least recent at back.",
          "No Belady's Anomaly (unlike FIFO)",
        ],
      },
      {
        heading: "LRU Approximation — Reference Bit",
        bullets: [
          "Add 1 reference bit to page table: 1=page referenced (used), 0=not referenced",
          "LRU approximation: replace page with reference bit = 0",
          "Second Chance algorithm: go through pages clockwise. If reference bit=1 → clear to 0 (second chance), move on. If reference bit=0 → replace this page.",
        ],
      },
      {
        heading: "Enhanced Second Chance",
        bullets: [
          "Use BOTH reference bit and dirty bit: (Reference bit, Dirty bit)",
          "(0,0) = not referenced & not modified → BEST to replace",
          "(0,1) = not referenced but modified → must write back",
          "(1,0) = referenced but not modified → will likely be used soon",
          "(1,1) = referenced & modified → WORST to replace",
        ],
      },
      {
        heading: "Counting Algorithms",
        bullets: [
          "MFU (Most Frequently Used): replace page used MOST often (reasoning: page just brought in has small count)",
          "LFU (Least Frequently Used): replace page used LEAST often",
        ],
      },
      {
        heading: "Allocation of Frames",
        bullets: [
          "Equal Allocation: each process gets same # of frames. Example: 100 frames, 5 processes → 20 frames each. Unfair → poor performance.",
          "Proportional by Size: process Pi gets (Si / ΣSi) × m frames. Example: S1=100KB, S2=400KB, S3=700KB, m=100 → P1≈8, P2≈34, P3≈58 frames",
          "Proportional by Priority: process Pi gets (priority_i / Σpriority_j) × m frames",
          "Global vs Local Replacement: Global — process can steal frames from others. Local — process can only replace its own frames.",
        ],
      },
      {
        heading: "Thrashing",
        bullets: [
          "OS is busy SWAPPING pages in & out constantly — very little actual work gets done",
          "Cause: too few frames allocated to process → many page faults → OS thinks degree of multiprogramming is low → adds more processes → gets WORSE",
          "Result: CPU utilization drops dramatically, most time spent on page swapping",
          "Solution: reduce degree of multiprogramming (fewer processes in memory)",
        ],
      },
    ],
  },
  {
    id: "ch10",
    title: "Ch 10: File Systems",
    color: "#059669",
    emoji: "📁",
    sections: [
      {
        heading: "File Concept",
        bullets: [
          "Contiguous logical address space",
          "Types: Data (numeric, characters, binary), Program (source, object/load image), Documents",
          "File Attributes: Name (only human-readable info), Type, Location (pointer to device), Size, Protection (who can read/write/execute), Time/date/user identification",
          "File info stored in directory structure maintained on disk — called Device Directory",
        ],
      },
      {
        heading: "File Operations",
        bullets: [
          "Create, Open, Close, Write, Read, Reposition within file, Delete",
        ],
      },
      {
        heading: "Access Methods",
        bullets: [
          "Sequential Access: read next, write next, reset. No read after last write (generally no rewrite).",
          "Direct Access: read n, write n, position to n, read next, write next, rewrite n. n = relative block number.",
        ],
      },
      {
        heading: "Directory Structure",
        bullets: [
          "Info stored: Name, Type, Address (Location), Current Length, Maximum Length, Current Position (File Pointer FP), Date last accessed, Date last updated, Owner ID, Protection Info",
          "Directory operations: Search file, Create file, Delete file, List directory, Rename file, Traverse file system",
          "Device Directory: physical information about files (name, size, date...)",
          "User File Directory: logical information about user files",
          "Implementation: Hash Table — decreases search time. Collision = two file names hash to same location.",
        ],
      },
      {
        heading: "User File Directory Implementation",
        bullets: [
          "Organize to obtain: Efficiency (locate files quickly), Naming (convenient to users; same file = multiple names/aliases), Grouping (logical grouping by properties)",
          "Tree-structured directories: efficient searching, grouping capabilities, current/working directory",
        ],
      },
    ],
  },
  {
    id: "ch11_12",
    title: "Ch 11+12: Disk & File Implementation",
    color: "#0891b2",
    emoji: "💿",
    sections: [
      {
        heading: "Disk Structure",
        bullets: [
          "Disk organized as array of blocks. Sector (block) = smallest addressable unit (track, surface, sector)",
          "Address (i, j, k): i = track#, j = surface#, k = block#",
          "1D block number: b = k + s × (j + i × t). s = # sectors per surface, t = # surfaces (tracks per cylinder)",
          "Seek Time: time to move R/W head to the correct track (mechanical movement)",
          "Latency Time: time to rotate sector under the R/W head",
          "Access Time = Seek Time + Latency Time + Transfer Time",
          "Minimize seek time → select good disk scheduling algorithm",
        ],
      },
      {
        heading: "Disk Scheduling Algorithms",
        bullets: [
          "Example: 200 tracks (0-199). Queue: 98,183,37,122,14,124,65,67. R/W head at track 53 (just served track 40).",
          "(1) FCFS: serve in order of arrival → 640 total head movement",
          "(2) SSTF (Shortest Seek Time First): always go to NEAREST track first → AHM = 29 tracks/job. Gives optimal/minimum solution BUT Problem: Starvation",
          "(3) SCAN (Elevator): head moves in one direction servicing all requests, reaches end, reverses. AHM = 41 tracks/job",
          "(4) C-SCAN (Circular Scan): head goes one direction, jumps back to beginning (no servicing on return). AHM = 47 tracks/job",
          "(5) LOOK: like SCAN but only goes as far as last request in each direction. AHM = 37 tracks/job",
          "(6) C-LOOK: like C-SCAN but only goes to last request then jumps to first request. AHM = 42 tracks/job",
        ],
      },
      {
        heading: "Blocking",
        bullets: [
          "Blocking factor: number of logical records packed into a physical block",
          "Packing and unpacking logical records in physical blocks",
        ],
      },
      {
        heading: "Free-Space Management",
        bullets: [
          "Bit Map: vector of n blocks — 1=free, 0=occupied (or vice versa)",
          "Linked List (Free List): link all free blocks together",
          "Counting: address of first free block + number n of adjacent free blocks (best for contiguous allocation)",
          "Grouping: store addresses of n free blocks in the first free block",
        ],
      },
      {
        heading: "File Allocation Methods",
        bullets: [
          "(1) Contiguous Allocation: each file occupies contiguous blocks. Defined by start block + length. Supports both random & sequential access. Problem: external fragmentation. Solution: compaction. Major Problem: files can't grow.",
          "(2) Linked Allocation: each file is a linked list of disk blocks. Blocks can be anywhere. Advantages: simple (need only start + size), no external fragmentation, file can grow. Problems: address pointer waste, supports ONLY sequential access.",
          "(3) Indexed Allocation: all pointers in one INDEX BLOCK. Need index table. Supports random & sequential access. Dynamic access without external fragmentation. Overhead: index block itself.",
        ],
      },
    ],
  },
];

const flashcardData = [
  { q: "What are the 3 OS goals?", a: "1. Overall: Execute user programs. 2. Primary: Convenience (easier for user to interact with OS than machine language). 3. Secondary: Efficiency (manage resources efficiently). Also: Utilization — keep CPU/memory/I/O as busy as possible." },
  { q: "What is Throughput?", a: "The number of jobs (programs) that finish execution per unit of time. Measures computer performance." },
  { q: "Multiprogramming vs Time Sharing — key difference?", a: "Multiprogramming: CPU switches when the job NEEDS I/O. Time Sharing: CPU switches when Quantum Q EXPIRES (in addition to I/O needed, job finishes, or higher priority process)." },
  { q: "What is a Context Switch?", a: "Saves the register state for the current job (Job 1) and reloads the register state for the next job (Job 2). Every switch between processes Pi and Pj needs 2 context switches." },
  { q: "What are the 5 process states?", a: "NEW (just created) → READY (in memory, waiting for CPU) → RUNNING (has CPU) → WAITING (waiting for I/O) → TERMINATED (finished). Key: process must START and END with a CPU burst." },
  { q: "What is in a PCB?", a: "Process Control Block: Process ID, Process State, PC (Program Counter), Registers, Scheduling info, Memory info (Base & Limit Registers), Accounting Info." },
  { q: "What is the degree of multiprogramming?", a: "The number of jobs currently in memory (in the Ready Queue). Long-Term scheduling controls this by deciding which jobs to admit from the Job Queue to memory." },
  { q: "Bernstein's Conditions for concurrent execution?", a: "S1 and S2 can execute concurrently if: ① R(S1) ∩ W(S2) = Ø AND ② W(S1) ∩ R(S2) = Ø AND ③ W(S1) ∩ W(S2) = Ø. All three must be empty sets." },
  { q: "What are the 3 Critical Section requirements?", a: "1. Mutual Exclusion: only one process in CS at a time. 2. Progress: if CS is free and process wants it, it can get it (no indefinite postponement). 3. Bounded Waiting: bound on times others enter CS after request." },
  { q: "Which software algorithm satisfies all 3 CS requirements?", a: "Algorithm 3 (Peterson's Algorithm): uses both flag[] array (indicates intent to enter CS) and turn variable (resolves conflict when both want to enter). Satisfies Mutual Exclusion, Progress, and Bounded Waiting." },
  { q: "What is a Semaphore and its two operations?", a: "Integer variable accessed via two ATOMIC operations only. Wait(S): while(S≤0){wait}; S--. Signal(S): S++. With blocking: Wait decrements and blocks if S<0. Signal increments and wakes a process if S≤0." },
  { q: "4 Necessary Conditions for Deadlock?", a: "1. Mutual Exclusion (resource used exclusively). 2. Hold & Wait (holds one, waits for another). 3. Non Pre-emption (can't forcefully remove resource). 4. Circular Wait (cycle of processes waiting). ALL FOUR must hold simultaneously." },
  { q: "What is a Safe State (deadlock avoidance)?", a: "A safe state exists if there is a sequence <P0, P1, ..., Pn-1> where each Pi can get all needed resources from: currently available + resources released by P0...P(i-1). If safe sequence exists → no deadlock possible." },
  { q: "Logical vs Physical Address?", a: "Logical Address (LA): address seen in the program (offset in program). Physical Address (PA): actual address in memory. PA = LA + Base Register. If LA ≥ Limit Register → Memory Fault." },
  { q: "Paging formulas?", a: "Page Number P = LA / Page Size (or upper bits of LA). Page Offset D = LA % Page Size (or lower n bits). Physical Address PA = Frame# × Page Size + D. Page table maps P → Frame#." },
  { q: "Effective Access Time (EAT) with TLB?", a: "EAT = h(m+t) + (1-h)(2m+t). h=hit ratio, m=memory access time, t=TLB search time. Example: h=0.95, m=100ns, t=1ns → EAT = 0.95×101 + 0.05×201 = 106ns" },
  { q: "What is Thrashing?", a: "OS is busy swapping pages in & out constantly. Cause: too few frames → many page faults → OS thinks multiprogramming is low → adds processes → gets worse. Performance collapses. Solution: reduce degree of multiprogramming." },
  { q: "FIFO vs LRU vs Optimal page replacement?", a: "FIFO: replace oldest page. Has Belady's Anomaly (more frames → more faults possible). Optimal: replace page not needed for longest in future. Best but impossible (needs future knowledge). LRU: replace least recently used. No Belady's Anomaly. Best practical algorithm." },
  { q: "EAT for Demand Paging?", a: "EAT = (1-P)×m + P×page_fault_overhead. Page fault overhead = Swap_in + Maybe Swap_out + m. Example: m=10mics, page_transfer=10ms, 40% need swap-out → EAT ≈ 10 + 14000P. Performance depends heavily on P!" },
  { q: "3 File Allocation Methods?", a: "1. Contiguous: file in consecutive blocks. Fast random access. External fragmentation, can't grow. 2. Linked: file is linked list of blocks. No fragmentation, can grow. ONLY sequential access. 3. Indexed: all pointers in index block. Random + sequential. Overhead of index block." },
  { q: "CPU Scheduling: Turnaround Time, Waiting Time formulas?", a: "Turnaround Time = Finish Time − Arrival Time. Waiting Time = Turnaround Time − Service (CPU) Time. Weighted Turnaround = Turnaround Time / Service Time. Want to MINIMIZE both, MAXIMIZE CPU Utilization & Throughput." },
  { q: "SJF burst estimation formula?", a: "Y(n+1) = w × T(n) + Y(n) × (1-w). T(n) = actual length of nth burst. Y(n) = estimated. 0 ≤ w ≤ 1. w=0 → ignore recent, use history only. w=1 → use only most recent. w=1/2 → Y(n+1) = T(n)/2 + T(n-1)/4 + T(n-2)/8 + ..." },
  { q: "What is Spooling vs Buffering?", a: "Buffering: I/O of ONE job overlapped with execution of the SAME job. Spool Area + Job Queue introduced. Spooling: I/O of ONE job overlapped with execution of a DIFFERENT job. Key data structures: Job Queue/Pool and Spool Area." },
  { q: "What is the Bankers Algorithm?", a: "Deadlock avoidance. Each process declares max needs. On request: check if granting leads to safe state. If yes → grant. If no → wait. Uses: Available, Allocation, Need = Max - Allocation. Find safe sequence by repeatedly picking process whose Need ≤ Available." },
  { q: "Symmetric vs Asymmetric Multiprocessing?", a: "Symmetric: each CPU has its own identical copy of OS. Reliable & Simple. Asymmetric: one MASTER CPU controls all other (slave) CPUs. Master/slave relationship. Reliable on all cases UNLESS master CPU is faulty." },
  { q: "What is the Producer-Consumer circular buffer? When is it full/empty?", a: "Circular array buffer[n]. 'in' = index to add items. 'out' = index to remove items. Full: (in+1) % n == out. Empty: in == out. Disadvantage: only n-1 slots usable when n buffers exist." },
  { q: "Second Chance page replacement algorithm?", a: "Clock algorithm. Go through pages in circular order. If reference bit=1 → clear to 0 (give second chance), move on. If reference bit=0 → REPLACE this page. Enhanced version also uses dirty bit: best=(0,0), worst=(1,1)." },
  { q: "Disk scheduling: SSTF vs SCAN vs C-SCAN?", a: "SSTF: go to nearest track first. Gives minimum avg seek time but causes starvation. SCAN (Elevator): go in one direction, service all, reverse. C-SCAN: go one direction, service, jump to beginning without servicing. LOOK/C-LOOK: same but only go to last request (not disk end)." },
];

export default function OSStudyGuide() {
  const [activeTab, setActiveTab] = useState("topics");
  const [activeTopic, setActiveTopic] = useState(null);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcOrder, setFcOrder] = useState([...Array(flashcardData.length).keys()]);
  const [search, setSearch] = useState("");

  const shuffleCards = () => {
    const arr = [...Array(flashcardData.length).keys()];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setFcOrder(arr);
    setFcIndex(0);
    setFcFlipped(false);
  };

  const currentCard = flashcardData[fcOrder[fcIndex]];

  const filteredTopics = search
    ? topics.map(t => ({
        ...t,
        sections: t.sections
          .map(s => ({
            ...s,
            bullets: s.bullets.filter(b => b.toLowerCase().includes(search.toLowerCase())),
          }))
          .filter(s => s.bullets.length > 0 || s.heading.toLowerCase().includes(search.toLowerCase())),
      })).filter(t => t.sections.length > 0 || t.title.toLowerCase().includes(search.toLowerCase()))
    : topics;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", background: "#0c0c14", color: "#e2e2f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #111827 0%, #1a1035 50%, #0d1f3c 100%)", padding: "22px 20px 14px", borderBottom: "1px solid #1e1e30" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 4 }}>Operating Systems — COMP/CS</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f5f5ff", letterSpacing: -0.5 }}>OS Study Guide</h1>
          <p style={{ margin: "5px 0 14px", fontSize: 13, color: "#8888aa" }}>Exam: July 2 · Chapters 1–12 · Based on Omar Batran notes · 28 flashcards</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ id: "topics", label: "📚 Topics" }, { id: "flashcards", label: "🃏 Flashcards" }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: activeTab === tab.id ? "#7c3aed" : "#1e1e2e", color: activeTab === tab.id ? "#fff" : "#8888aa", transition: "all 0.15s" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "18px 16px" }}>

        {activeTab === "topics" && (
          <>
            <input
              placeholder="🔍  Search any concept, formula, or keyword..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveTopic(null); }}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #1e1e30", background: "#161624", color: "#e2e2f0", fontSize: 14, marginBottom: 14, boxSizing: "border-box", outline: "none" }}
            />

            {/* Chapter grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 18 }}>
              {filteredTopics.map(topic => (
                <button key={topic.id}
                  onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                  style={{ background: activeTopic === topic.id ? topic.color + "20" : "#161624", border: `1px solid ${activeTopic === topic.id ? topic.color : "#1e1e30"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", color: "#e2e2f0" }}>
                  <div style={{ fontSize: 16 }}>{topic.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: activeTopic === topic.id ? topic.color : "#9999bb", lineHeight: 1.3 }}>{topic.title}</div>
                </button>
              ))}
            </div>

            {/* Expanded chapter */}
            {activeTopic && !search && (() => {
              const topic = topics.find(t => t.id === activeTopic);
              if (!topic) return null;
              return (
                <div style={{ background: "#111120", border: `1px solid ${topic.color}55`, borderRadius: 14, padding: "20px 22px", marginBottom: 16, animation: "fadeIn 0.2s" }}>
                  <div style={{ fontSize: 20, marginBottom: 2 }}>{topic.emoji}</div>
                  <h2 style={{ margin: "0 0 18px", fontSize: 17, color: topic.color, fontWeight: 700 }}>{topic.title}</h2>
                  {topic.sections.map((section, si) => (
                    <div key={si} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 9 }}>
                        <div style={{ width: 3, height: 16, background: topic.color, borderRadius: 2, marginRight: 10 }} />
                        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#ccccee", letterSpacing: 0.2 }}>{section.heading}</h3>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                        {section.bullets.map((bullet, bi) => {
                          const isHighlight = bullet.startsWith("⚠️") || bullet.startsWith("Example") || bullet.includes("= ") && bullet.includes("→") || bullet.startsWith("Flow:") || bullet.startsWith("PA =") || bullet.startsWith("EAT");
                          return (
                            <li key={bi} style={{ marginBottom: 7, fontSize: 13, lineHeight: 1.65, color: "#aaaac8", position: "relative", paddingLeft: 14 }}>
                              <span style={{ position: "absolute", left: 0, top: 7, width: 5, height: 5, borderRadius: "50%", background: topic.color + "88", display: "block" }} />
                              {isHighlight ? (
                                <span style={{ background: topic.color + "12", borderLeft: `3px solid ${topic.color}88`, paddingLeft: 10, paddingTop: 3, paddingBottom: 3, paddingRight: 8, display: "block", borderRadius: "0 6px 6px 0", color: "#d8d8f0", fontFamily: bullet.includes("=") && !bullet.startsWith("Example") ? "monospace" : "inherit", fontSize: bullet.includes("=") && !bullet.startsWith("Example") ? 12 : 13 }}>{bullet}</span>
                              ) : bullet}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Search results */}
            {search && filteredTopics.map(topic => (
              <div key={topic.id} style={{ background: "#111120", border: `1px solid ${topic.color}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 14 }}>
                <h2 style={{ margin: "0 0 12px", fontSize: 15, color: topic.color }}>{topic.emoji} {topic.title}</h2>
                {topic.sections.map((section, si) => section.bullets.length > 0 && (
                  <div key={si} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#bbbbdd", marginBottom: 6 }}>▶ {section.heading}</div>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {section.bullets.map((b, bi) => <li key={bi} style={{ fontSize: 12, color: "#9999bb", marginBottom: 4, lineHeight: 1.55 }}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {!activeTopic && !search && (
              <div style={{ textAlign: "center", color: "#444466", fontSize: 13, padding: "24px 0", border: "1px dashed #1e1e30", borderRadius: 12 }}>
                👆 Click any chapter card above to expand its notes
              </div>
            )}
          </>
        )}

        {activeTab === "flashcards" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#55558888" }}>Card {fcIndex + 1} / {flashcardData.length}</div>
              <button onClick={shuffleCards} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #1e1e30", background: "#161624", color: "#8888aa", fontSize: 12, cursor: "pointer" }}>🔀 Shuffle</button>
            </div>

            <div style={{ background: "#161624", borderRadius: 6, height: 4, marginBottom: 18 }}>
              <div style={{ background: "#7c3aed", height: 4, borderRadius: 6, width: `${((fcIndex + 1) / flashcardData.length) * 100}%`, transition: "width 0.3s" }} />
            </div>

            <div onClick={() => setFcFlipped(!fcFlipped)}
              style={{ background: fcFlipped ? "#130d26" : "#161624", border: `2px solid ${fcFlipped ? "#7c3aed" : "#1e1e30"}`, borderRadius: 14, padding: "28px 26px", minHeight: 160, cursor: "pointer", transition: "all 0.2s", marginBottom: 18, userSelect: "none" }}>
              <div style={{ fontSize: 10, letterSpacing: 2.5, color: fcFlipped ? "#a78bfa" : "#444466", textTransform: "uppercase", marginBottom: 14 }}>
                {fcFlipped ? "ANSWER" : "QUESTION — tap to flip"}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: fcFlipped ? "#d8d8f8" : "#b8b8d8", fontWeight: fcFlipped ? 400 : 500 }}>
                {fcFlipped ? currentCard.a : currentCard.q}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setFcIndex(Math.max(0, fcIndex - 1)); setFcFlipped(false); }}
                disabled={fcIndex === 0}
                style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid #1e1e30", background: "#161624", color: fcIndex === 0 ? "#2a2a44" : "#8888aa", fontSize: 14, cursor: fcIndex === 0 ? "not-allowed" : "pointer" }}>
                ← Prev
              </button>
              <button onClick={() => { setFcFlipped(false); setTimeout(() => setFcIndex(Math.min(flashcardData.length - 1, fcIndex + 1)), 50); }}
                disabled={fcIndex === flashcardData.length - 1}
                style={{ flex: 2, padding: "12px", borderRadius: 10, border: "none", background: fcIndex === flashcardData.length - 1 ? "#1e1e30" : "#7c3aed", color: "#fff", fontSize: 14, cursor: fcIndex === flashcardData.length - 1 ? "not-allowed" : "pointer", fontWeight: 600 }}>
                Next →
              </button>
            </div>

            <div style={{ marginTop: 20, padding: 14, background: "#111120", borderRadius: 10, border: "1px solid #1e1e30" }}>
              <div style={{ fontSize: 11, color: "#444466", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Quick Reference — Formulas</div>
              {[
                ["Turnaround Time", "Finish Time − Arrival Time"],
                ["Waiting Time", "Turnaround Time − Service (CPU) Time"],
                ["Weighted Turnaround", "Turnaround Time / Service Time"],
                ["Physical Address (Contiguous)", "PA = LA + Base Register"],
                ["Physical Address (Paging)", "PA = Frame# × Page Size + Offset (d)"],
                ["Page Number", "P = LA / Page Size (or upper bits of LA)"],
                ["Page Offset", "D = LA % Page Size (or lower n bits)"],
                ["EAT with TLB", "h(m+t) + (1-h)(2m+t)"],
                ["EAT Demand Paging", "(1-P)×m + P×page_fault_overhead"],
                ["Disk block address", "b = k + s×(j + i×t)"],
                ["Banker's NEED", "NEED[i] = MAX[i] − Allocation[i]"],
              ].map(([label, formula]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
                  <span style={{ fontSize: 12, color: "#6666aa" }}>{label}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: "#b0b0d8", background: "#1a1a2e", padding: "1px 8px", borderRadius: 4 }}>{formula}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
