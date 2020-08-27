export interface IConfig {
    dist: string;
    srcEntry: string;
    files: string[];
    ignore: string[];
    plugins: {
        [filename: string]: {
            handler: string;
        };
    };
}
export declare type IHandler = (config: IConfig) => Promise<void>;
export declare function init(): Promise<void>;
