# API Reference

Complete API documentation for useless bot.

## @useless/core

### `createUselessBot(options?)`

Creates a new useless bot instance.

**Parameters:**
- `options` (`UselessOptions`): Configuration options

**Returns:** `UselessInstance`

**Example:**
```typescript
const app = createUselessBot({
  mode: 'production',
  debug: false,
  plugins: []
});
```

### `UselessInstance`

The main useless bot instance interface.

#### Methods

##### `initialize(): Promise<void>`

Initializes the useless bot instance.

**Returns:** Promise that resolves when initialization is complete

**Throws:** `UselessError` if already initialized

**Example:**
```typescript
await app.initialize();
```

##### `run(): Promise<void>`

Runs the useless bot operation.

**Returns:** Promise that resolves when operation is complete

**Throws:** `UselessError` if not initialized

**Example:**
```typescript
await app.run();
```

##### `destroy(): Promise<void>`

Destroys the useless bot instance and cleans up resources.

**Returns:** Promise that resolves when destroyed

**Example:**
```typescript
await app.destroy();
```

##### `getResult(): undefined`

Gets the result of the useless bot operation.

**Returns:** Always returns `undefined`

**Example:**
```typescript
const result = app.getResult(); // undefined
```

##### `getStatus(): UselessStatus`

Gets the current status of the useless bot instance.

**Returns:** Status string: `'idle' | 'initializing' | 'ready' | 'running' | 'destroyed'``

**Example:**
```typescript
console.log(app.getStatus()); // 'ready'
```

##### `getConfig(): UselessOptions`

Gets the configuration of the useless bot instance.

**Returns:** Configuration object

**Example:**
```typescript
const config = app.getConfig();
```

### `isVoid(value)`

Type guard to check if a value is a VoidInstance.

**Parameters:**
- `value` (`unknown`): Value to check

**Returns:** `boolean`

**Example:**
```typescript
if (isVoid(value)) {
  await value.run();
}
```

### `VoidError`

Error class for void-related errors.

**Extends:** `Error`

**Example:**
```typescript
try {
  await app.run();
} catch (error) {
  if (error instanceof VoidError) {
    console.error('Void error:', error.message);
  }
}
```

### Helper Functions

#### `doNothing(): Promise<void>`

Asynchronously does nothing.

**Returns:** Promise that resolves to nothing

**Example:**
```typescript
await doNothing();
```

#### `getNothing(): undefined`

Returns nothing.

**Returns:** `undefined`

**Example:**
```typescript
const nothing = getNothing();
```

#### `isNothing(value): boolean`

Checks if a value is nothing (null or undefined).

**Parameters:**
- `value` (`unknown`): Value to check

**Returns:** `boolean`

**Example:**
```typescript
if (isNothing(value)) {
  console.log('Value is nothing');
}
```

## @void/utils

### Function Utilities

#### `noop(): void`

Does nothing synchronously.

```typescript
callback: noop
```

#### `identity<T>(value: T): T`

Returns the input value unchanged.

```typescript
const same = identity(value);
```

#### `constant<T>(value: T): () => T`

Creates a function that always returns the same value.

```typescript
const getZero = constant(0);
```

### Async Utilities

#### `sleep(ms: number): Promise<void>`

Asynchronously waits for specified duration.

```typescript
await sleep(1000); // Wait 1 second
```

#### `asyncNoop(): Promise<void>`

Async version of noop.

```typescript
await asyncNoop();
```

### Array Utilities

#### `empty<T>(): T[]`

Returns an empty array.

```typescript
const arr = empty<string>();
```

#### `times<T>(n: number, fn: (i: number) => T): T[]`

Calls function n times and collects results.

```typescript
const arr = times(5, i => i * 2);
```

### Object Utilities

#### `emptyObject(): {}`

Returns an empty object.

```typescript
const obj = emptyObject();
```

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Omits properties from an object.

```typescript
const result = omit(obj, ['a', 'b']);
```

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Picks properties from an object.

```typescript
const result = pick(obj, ['a', 'b']);
```

### Type Guards

#### `isUndefined(value): value is undefined`

Checks if value is undefined.

```typescript
if (isUndefined(value)) { }
```

#### `isNull(value): value is null`

Checks if value is null.

```typescript
if (isNull(value)) { }
```

#### `isNullish(value): value is null | undefined`

Checks if value is null or undefined.

```typescript
if (isNullish(value)) { }
```

### Higher-Order Functions

#### `debounce<T>(fn: T, ms: number): T`

Debounces a function.

```typescript
const debouncedFn = debounce(fn, 300);
```

#### `throttle<T>(fn: T, ms: number): T`

Throttles a function.

```typescript
const throttledFn = throttle(fn, 1000);
```

#### `memoize<T>(fn: T): T`

Memoizes a function's return value.

```typescript
const memoizedFn = memoize(expensiveFn);
```

## @void/types

Type definitions for Void. See [TypeScript Types](#typescript-types) section.

## @void/logger

### `createLogger(options?)`

Creates a logger instance.

**Parameters:**
- `options.level` - Log level threshold
- `options.pretty` - Enable colors
- `options.timestamp` - Show timestamps
- `options.prefix` - Custom prefix
- `options.silent` - Silent mode

**Returns:** `Logger`

**Example:**
```typescript
const logger = createLogger({
  level: 'info',
  pretty: true
});
```

### Logger Methods

#### `debug(...args): void`
#### `info(...args): void`
#### `warn(...args): void`
#### `error(...args): void`
#### `success(...args): void`
#### `time(label: string): void`
#### `timeEnd(label: string): void`
#### `group(label: string): void`
#### `groupEnd(): void`
#### `table(data: any[]): void`

## @void/cli

Command-line interface. See CLI documentation for command reference.

## @void/react

### Hooks

#### `useVoid(options?): VoidInstance`

Creates and manages a void instance in React.

```typescript
const void = useVoid({ mode: 'production' });
```

#### `useNothing(): undefined`

Always returns undefined.

```typescript
const nothing = useNothing();
```

#### `useVoidState(): [undefined, (value?) => void]`

State hook that manages nothing.

```typescript
const [value, setValue] = useVoidState();
```

#### `useVoidEffect(callback): void`

Effect hook that does nothing.

```typescript
useVoidEffect(() => {
  // Effect
});
```

### Components

#### `<VoidProvider>`

Provides void context.

```typescript
<VoidProvider config={{}}>
  <App />
</VoidProvider>
```

#### `<Void />`

Renders nothing.

```typescript
<Void />
```

## TypeScript Types

### Core Types

```typescript
type Void = undefined;
type Nothing = null | undefined;
type Nullish = null | undefined;
type Empty = [] | {};
type VoidResult = undefined;
type VoidCallback = () => void;
type VoidAsyncCallback = () => Promise<void>;
type VoidPromise = Promise<void>;
```

### Utility Types

```typescript
type MaybeVoid<T> = T | void;
type VoidOr<T> = T | undefined;
type DeepVoid<T> = { [K in keyof T]: void };
type VoidRecord<K> = Record<K, void>;
```

## Error Codes

| Code | Description |
|------|-------------|
| `VOID_ERROR` | Generic void error |
| `NOT_INITIALIZED` | Void not initialized |
| `ALREADY_INITIALIZED` | Void already initialized |
| `ALREADY_DESTROYED` | Void already destroyed |

---

For more examples, see the [examples directory](../examples/).
