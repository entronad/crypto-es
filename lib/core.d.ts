/**
 * Encoder interface for encoding strategies
 */
export interface Encoder {
    /**
     * Converts a word array to a string representation
     * @param wordArray - The word array to stringify
     * @returns The string representation
     */
    stringify(wordArray: WordArray): string;
    /**
     * Converts a string to a word array
     * @param str - The string to parse
     * @returns The word array representation
     */
    parse(str: string): WordArray;
}
/**
 * Configuration options for hashers
 */
export interface HasherCfg {
    /** Output length for SHA3 */
    outputLength?: number;
}
/**
 * Type definition for hash functions
 */
export type HashFn = (message: WordArray | string, cfg?: HasherCfg) => WordArray;
/**
 * Type definition for HMAC hash functions
 */
export type HMACHashFn = (message: WordArray | string, key: WordArray | string) => WordArray;
/**
 * Type for supported typed arrays
 */
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
/**
 * Type for word array input
 */
type WordArrayInput = number[] | ArrayBuffer | TypedArray;
/**
 * Base class for inheritance.
 * Provides basic object-oriented programming utilities.
 */
export declare class Base {
    /**
     * Creates a new instance of this class with the provided arguments.
     * This is a factory method that provides an alternative to using 'new'.
     *
     * @param args - Arguments to pass to the constructor
     * @returns A new instance of this class
     * @static
     * @example
     * ```javascript
     * const instance = MyType.create(arg1, arg2);
     * ```
     */
    static create<T extends Base>(this: new (...args: any[]) => T, ...args: any[]): T;
    /**
     * Copies properties from the provided object into this instance.
     * Performs a shallow merge of properties.
     *
     * @param properties - The properties to mix in
     * @returns This instance for method chaining
     * @example
     * ```javascript
     * instance.mixIn({ field: 'value', another: 123 });
     * ```
     */
    mixIn(properties: Record<string, unknown>): this;
    /**
     * Creates a deep copy of this object.
     *
     * @returns A clone of this instance
     * @example
     * ```javascript
     * const clone = instance.clone();
     * ```
     */
    clone(): this;
}
/**
 * An array of 32-bit words.
 * This is the core data structure used throughout the library for representing binary data.
 *
 * @property words - The array of 32-bit words
 * @property sigBytes - The number of significant bytes in this word array
 */
export declare class WordArray extends Base {
    /** The array of 32-bit words */
    words: number[];
    /** The number of significant bytes in this word array */
    sigBytes: number;
    /**
     * Initializes a newly created word array.
     * Can accept various input formats including regular arrays, typed arrays, and ArrayBuffers.
     *
     * @param words - An array of 32-bit words, typed array, or ArrayBuffer
     * @param sigBytes - The number of significant bytes in the words (defaults to words.length * 4)
     * @example
     * ```javascript
     * const wordArray = new WordArray();
     * const wordArray = new WordArray([0x00010203, 0x04050607]);
     * const wordArray = new WordArray([0x00010203, 0x04050607], 6);
     * const wordArray = new WordArray(new Uint8Array([1, 2, 3, 4]));
     * ```
     */
    constructor(words?: WordArrayInput, sigBytes?: number);
    /**
     * Initialize from Uint8Array
     * @private
     */
    private _initFromUint8Array;
    /**
     * Creates a word array filled with cryptographically strong random bytes.
     * Uses Web Crypto API if available, falls back to Math.random() if not.
     *
     * @param nBytes - The number of random bytes to generate
     * @returns The random word array
     * @static
     * @example
     * ```javascript
     * const randomBytes = WordArray.random(16); // Generate 16 random bytes
     * ```
     */
    static random: (nBytes: number) => WordArray;
    /**
     * Converts this word array to a string using the specified encoding.
     *
     * @param encoder - The encoding strategy to use (defaults to Hex)
     * @returns The stringified word array
     * @example
     * ```javascript
     * const hexString = wordArray.toString();
     * const base64String = wordArray.toString(Base64);
     * const utf8String = wordArray.toString(Utf8);
     * ```
     */
    toString(encoder?: Encoder): string;
    /**
     * Concatenates a word array to this word array.
     * Modifies this word array in place.
     *
     * @param wordArray - The word array to append
     * @returns This word array for method chaining
     * @example
     * ```javascript
     * wordArray1.concat(wordArray2);
     * const combined = wordArray1.concat(wordArray2).concat(wordArray3);
     * ```
     */
    concat(wordArray: WordArray): this;
    /**
     * Removes insignificant bits from the end of the word array.
     * This ensures the word array only contains the exact number of significant bytes.
     *
     * @example
     * ```javascript
     * wordArray.clamp();
     * ```
     */
    clamp(): void;
    /**
     * Creates a copy of this word array.
     *
     * @returns The cloned word array
     * @example
     * ```javascript
     * const clone = wordArray.clone();
     * ```
     */
    clone(): WordArray;
}
/**
 * Hex encoding strategy.
 * Converts between word arrays and hexadecimal strings.
 */
export declare const Hex: Encoder;
/**
 * Latin1 encoding strategy.
 * Converts between word arrays and Latin-1 (ISO-8859-1) strings.
 */
export declare const Latin1: Encoder;
/**
 * UTF-8 encoding strategy.
 * Converts between word arrays and UTF-8 strings.
 */
export declare const Utf8: Encoder;
/**
 * Abstract buffered block algorithm template.
 * Provides a base implementation for algorithms that process data in fixed-size blocks.
 *
 * @property _minBufferSize - The number of blocks that should be kept unprocessed in the buffer
 */
export declare abstract class BufferedBlockAlgorithm extends Base {
    /** The number of blocks that should be kept unprocessed in the buffer */
    protected _minBufferSize: number;
    /** The data buffer */
    protected _data: WordArray;
    /** The number of bytes in the data buffer */
    protected _nDataBytes: number;
    /** The block size in 32-bit words */
    abstract blockSize: number;
    constructor();
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     * ```javascript
     * bufferedBlockAlgorithm.reset();
     * ```
     */
    reset(): void;
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param data - The data to append (strings are converted to WordArray using UTF-8)
     * @example
     * ```javascript
     * bufferedBlockAlgorithm._append('data');
     * bufferedBlockAlgorithm._append(wordArray);
     * ```
     */
    protected _append(data: WordArray | string): void;
    /**
     * Processes available data blocks.
     * This method invokes _doProcessBlock(dataWords, offset), which must be implemented by a concrete subtype.
     *
     * @param doFlush - Whether all blocks and partial blocks should be processed
     * @returns The processed data
     * @example
     * ```javascript
     * const processedData = bufferedBlockAlgorithm._process();
     * const processedData = bufferedBlockAlgorithm._process(true); // Flush
     * ```
     */
    protected _process(doFlush?: boolean): WordArray;
    /**
     * Process a single block of data.
     * Must be implemented by concrete subclasses.
     *
     * @param dataWords - The data words array
     * @param offset - The offset in the data words array
     */
    protected abstract _doProcessBlock(dataWords: number[], offset: number): void;
    /**
     * Creates a copy of this object.
     *
     * @returns The clone
     * @example
     * ```javascript
     * const clone = bufferedBlockAlgorithm.clone();
     * ```
     */
    clone(): this;
}
/**
 * Abstract hasher template.
 * Base class for all hash algorithm implementations.
 *
 * @property blockSize - The number of 32-bit words this hasher operates on (default: 16 = 512 bits)
 */
export declare abstract class Hasher extends BufferedBlockAlgorithm {
    /** The number of 32-bit words this hasher operates on */
    blockSize: number;
    /** Configuration options */
    cfg: HasherCfg;
    /** The hash result */
    protected _hash: WordArray;
    /**
     * Initializes a newly created hasher.
     *
     * @param cfg - Configuration options
     */
    constructor(cfg?: HasherCfg);
    /**
     * Creates a shortcut function to a hasher's object interface.
     *
     * @param SubHasher - The hasher class to create a helper for
     * @returns The shortcut function
     * @static
     * @example
     * ```javascript
     * const SHA256 = Hasher._createHelper(SHA256Algo);
     * ```
     */
    static _createHelper<T extends Hasher>(SubHasher: new (cfg?: HasherCfg) => T): HashFn;
    /**
     * Creates a shortcut function to the HMAC's object interface.
     *
     * @param SubHasher - The hasher class to use in this HMAC helper
     * @returns The shortcut function
     * @static
     * @example
     * ```javascript
     * const HmacSHA256 = Hasher._createHmacHelper(SHA256Algo);
     * ```
     */
    static _createHmacHelper<T extends Hasher>(SubHasher: new (cfg?: HasherCfg) => T): HMACHashFn;
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     * ```javascript
     * hasher.reset();
     * ```
     */
    reset(): void;
    /**
     * Updates this hasher with a message.
     *
     * @param messageUpdate - The message to append
     * @returns This hasher instance for method chaining
     * @example
     * ```javascript
     * hasher.update('message');
     * hasher.update(wordArray);
     * ```
     */
    update(messageUpdate: WordArray | string): this;
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param messageUpdate - An optional final message update
     * @returns The computed hash
     * @example
     * ```javascript
     * const hash = hasher.finalize();
     * const hash = hasher.finalize('message');
     * const hash = hasher.finalize(wordArray);
     * ```
     */
    finalize(messageUpdate?: WordArray | string): WordArray;
    /**
     * Resets the hasher to its initial state.
     * Must be implemented by concrete subclasses.
     */
    protected abstract _doReset(): void;
    /**
     * Finalizes the hash computation.
     * Must be implemented by concrete subclasses.
     */
    protected abstract _doFinalize(): WordArray;
}
/**
 * HMAC (Hash-based Message Authentication Code) algorithm.
 * Provides message authentication using a cryptographic hash function and a secret key.
 */
export declare class HMAC extends Base {
    /** The inner hasher instance */
    private _hasher;
    /** The outer key */
    private _oKey;
    /** The inner key */
    private _iKey;
    /**
     * Initializes a newly created HMAC.
     *
     * @param SubHasher - The hash algorithm class to use
     * @param key - The secret key
     * @example
     * ```javascript
     * const hmac = new HMAC(SHA256Algo, 'secret key');
     * ```
     */
    constructor(SubHasher: new (cfg?: HasherCfg) => Hasher, key: WordArray | string);
    /**
     * Factory method to create an HMAC instance.
     *
     * @param SubHasher - The hash algorithm class to use
     * @param key - The secret key
     * @returns A new HMAC instance
     * @static
     * @example
     * ```javascript
     * const hmac = HMAC.create(SHA256Algo, key);
     * ```
     */
    static create(SubHasher: new (cfg?: HasherCfg) => Hasher, key: WordArray | string): HMAC;
    /**
     * Resets this HMAC to its initial state.
     *
     * @example
     * ```javascript
     * hmac.reset();
     * ```
     */
    reset(): void;
    /**
     * Updates this HMAC with a message.
     *
     * @param messageUpdate - The message to append
     * @returns This HMAC instance for method chaining
     * @example
     * ```javascript
     * hmac.update('message');
     * hmac.update(wordArray);
     * ```
     */
    update(messageUpdate: WordArray | string): this;
    /**
     * Finalizes the HMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param messageUpdate - An optional final message update
     * @returns The computed HMAC
     * @example
     * ```javascript
     * const hmacValue = hmac.finalize();
     * const hmacValue = hmac.finalize('message');
     * const hmacValue = hmac.finalize(wordArray);
     * ```
     */
    finalize(messageUpdate?: WordArray | string): WordArray;
}
/**
 * Configuration options for key derivation functions
 */
export interface KDFCfg {
    /** Key size for EvpKDF */
    keySize?: number;
    /** Hasher function for EvpKDF */
    hasher?: new (cfg?: HasherCfg) => Hasher;
    /** Number of iterations */
    iterations?: number;
}
/**
 * Type definition for key derivation functions
 */
export type KDFFn = (password: WordArray | string, salt: WordArray | string, cfg?: KDFCfg) => WordArray;
export {};
