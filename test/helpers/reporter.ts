import {
    DisplayProcessor,
    SpecReporter,
    StacktraceOption,
} from 'jasmine-spec-reporter';
import { Configuration } from 'jasmine-spec-reporter/built/configuration';
import SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}
const config: Configuration = {
    spec: {
        displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
};
const reporter: SpecReporter = new SpecReporter(config);
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(reporter);
