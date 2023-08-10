/**
 * Searches for a value in an array and returns it if found, otherwise returns the default value.
 *
 * @param searchValue - the value to search for
 * @param values - The array of values to search within
 * @param defaultValue - The default value to return if the search value is not found.
 *
 * @ returns - The found value from the array, or the default value if not found.
 */
import always from "ramda/es/always"; // Returns a function that always returns the given value
import cond from "ramda/es/cond"; // Returns a function, fn, which encapsulates if/else, if/else, ... logic. R.cond takes a list of [predicate, transformer] pairs. All of the arguments to fn are applied to each of the predicates in turn until one returns a "truthy" value, at which point fn returns the result of applying its arguments to the corresponding transformer. If none of the predicates matches, fn returns undefined.
import includes from "ramda/es/includes"; // Returns true if the specified value is equal, in R.equals terms, to at least one element of the given list; false otherwise.
import T from "ramda/es/T"; // A function that always returns true

export const includesToDefault = (searchValue, values, defaultValue) =>
  cond([
    [includes(searchValue), always(searchValue)],
    [T, always(defaultValue)],
  ])(values);
