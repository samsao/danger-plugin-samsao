import * as fs from 'fs';
export declare function message(message: string): void;
export declare function fail(message: string): void;

interface Options {
  resultsPath: string;
}

export function jest(options: Options) {
  const { resultsPath } = options;

  try {
    const jsonFileContents = fs.readFileSync(resultsPath, 'utf8');
    const jsonResults = JSON.parse(jsonFileContents);

    jsonResults.success ? message('Tests passed :+1:') : fail('Tests failed :-1:');
  } catch (error) {
    fail(error);
  }
}
