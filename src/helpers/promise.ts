export function wait(time: number = 1000) {
	return new Promise<void>((res) => {
		setTimeout(() => res(), time);
	});
}
