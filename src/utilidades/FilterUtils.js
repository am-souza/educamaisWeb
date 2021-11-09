export function byKeyOrId(a, b) {
	return (a._key && a._key === b._key) || (a.id && a.id === b.id);
}
