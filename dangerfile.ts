import * as path from 'path';
import { jest } from './src/jest';

jest({ resultsPath: path.resolve(__dirname, 'reports/jest.json') });
