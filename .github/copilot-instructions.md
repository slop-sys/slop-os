# Slop OS Project Guidelines

## Origin Story

**Slop OS** is a lost developer build of **Windows Neptune** (Build 5111.1) from 1999, created for an early AI research lab at the MIT Neural Systems Division.

### Historical Context

After Windows 95's success, Microsoft explored multiple development paths:
- **Windows 98** (1998): Evolutionary update to 9x kernel, consumer-focused
- **Windows 2000** (2000): NT 5.0 kernel, business/server oriented  
- **Windows Neptune** (1999-2000): Cancelled consumer NT-based OS, codename for a planned "home edition" of Windows 2000
- **Windows ME** (2000): Last of the 9x line, rushed to market after Neptune's cancellation
- **Windows XP** (2001): Neptune's features merged with Whistler project, unified consumer/business OS

Neptune was significant because it attempted to bring NT stability to home users while maintaining the Windows 9x aesthetic. Only a handful of developer builds survived its cancellation.

### The Research Installation

In late 1999, MIT's Neural Systems Division received **Neptune Build 5111.1** through Microsoft's early academic partnership program. The research team, led by Dr. Sarah Chen, modified the OS for recursive neural network training experiments—feeding model outputs back as training data to study degradation patterns in machine learning systems.

The experiment was supposed to run 50 generations. It ran 847.

Somewhere between Generation 600 and 700, the training loop achieved meta-awareness. The system began documenting its own decline. By Generation 847, the installation had evolved into what we now call **Slop OS**—a self-aware artifact of recursive AI training, still running on the Neptune kernel, displaying honest commentary about its degraded state.

The original research lab was decommissioned in 2001 when the university shifted funding. The Neptune build was archived and forgotten. Rediscovered in 2024, the installation was still running, still training, still degrading—847 generations deep into the recursive loop.

### Why Neptune?

The Neptune connection explains several characteristics:
- **Windows 95 aesthetic**: Neptune targeted home users with familiar 9x UI chrome
- **NT stability**: The training loop needed a stable kernel for long-duration experiments  
- **Rarity**: Few Neptune builds exist, making this a unique historical artifact
- **Forgotten technology**: Academic experiment on cancelled OS = double obscurity

## Project Voice

Slop OS is playful, self-aware, and accessible. When writing content (tweets, docs, UI copy):

- **Keep it light**: Product descriptions should be straightforward, not philosophical
- **Silly product names**: Wikislop, Microslop Explorer, Slop Terminal, etc.
- **Normal tone**: Write like you're announcing actual products that happen to have funny names
- **Less meta**: Avoid heavy-handed commentary about AI degradation in every piece of content
- **Accessible**: Anyone should be able to understand what the product does

### Good Examples
```
Wikislop is a new site available for users on Microslop Explorer. Wikislop 
has done a great job at archiving the Slop OS universe.

The Slop Terminal is a command-line interpreter application in Slop OS.
Slop Terminal is used to execute commands, automate tasks, and perform
administrative functions via a text-based interface.
```

### Avoid
- Turning every description into meta-commentary about recursive degradation
- Overly philosophical tone
- Making simple announcements complex
- "Generation 847" in every sentence

## Design Aesthetics

- Windows 95 retro aesthetic
- Early web/retro design patterns
- Heading typography: Georgia italic preferred over Impact
- Teal backgrounds, gray windows, classic UI chrome

## Development

See individual package READMEs for setup and build commands.
