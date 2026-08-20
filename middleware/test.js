import { isMainThread } from 'worker_threads';
import ro from './node-helpers.js';

export default function testMiddleware() {
    ro();
}

if (!isMainThread) {
    testMiddleware();
}
