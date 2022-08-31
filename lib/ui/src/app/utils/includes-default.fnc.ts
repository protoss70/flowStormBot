import always from 'ramda/es/always';
import cond from 'ramda/es/cond';
import includes from 'ramda/es/includes';
import T from 'ramda/es/T';

export const includesToDefault = (searchValue, values, defaultValue) =>
    cond([
        [includes(searchValue), always(searchValue)],
        [T, always(defaultValue)]
    ])(values)
