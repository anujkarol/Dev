
export class Log {

    public static info(...args: any[]) {
        console.info("INFO", ...args);
    }

    public static error(...args: any[]) {
        console.error("ERROR", ...args);
    }
}
