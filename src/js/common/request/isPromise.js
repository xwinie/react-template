/**
 * Created by bobo on 29/06/2017.
 */
export default function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }

    return false;
}
