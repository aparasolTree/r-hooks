import { useMemo } from 'react';
import { debounce, DebounceOptions, Fn } from '@r-hooks/shared';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';

export function useDebounceFn<T extends Fn>(fn: T, ms: number, options: DebounceOptions = {}) {
    const { immediate = true } = options;
    const fnRef = useLatest(fn);
    const [debounceWrap, clear] = useMemo(
        () => debounce<T>(fnRef.current, ms, { immediate }),
        [ms, immediate, fnRef]
    );

    useUnmount(() => clear());

    return debounceWrap;
}
