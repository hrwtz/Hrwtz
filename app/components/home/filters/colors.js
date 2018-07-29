export function rgb2hex () {
	// http://stackoverflow.com/a/3627747/1552042

	return function (rgb) {
		/*jslint bitwise: true */
		if (/^#[0-9A-F]{6}$/i.test(rgb)) {
			return rgb;
		}

		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);

		function hex(x) {
			return ('0' + parseInt(x).toString(16)).slice(-2);
		}
	};
}

export function shadeColor () {
	// http://stackoverflow.com/a/13542669/1552042

	return function (color, percent) {
		/*jslint bitwise: true */
		percent = percent || 0.5;

		var f = parseInt(color.slice(1), 16),
			t = percent < 0 ? 0 : 255,
			p = percent < 0 ? percent *-1 : percent, 
			R = f >> 16,
			G = f >> 8 & 0x00FF,
			B = f & 0x0000FF,
			r = Math.round((t - R) * p) + R,
			g = Math.round((t - G) * p) + G,
			b = Math.round((t - B) * p) + B;

		return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
	};
}

export function blendColors () {
	// http://stackoverflow.com/a/13542669/1552042

	return function (c0, c1, p) {
		/*jslint bitwise: true */
		p = p || 0.5;

		var f = parseInt(c0.slice(1), 16),
			t = parseInt(c1.slice(1), 16),
			R1 = f >> 16,
			G1 = f >> 8 & 0x00FF,
			B1 = f & 0x0000FF,
			R2 = t >> 16,
			G2 = t >> 8 & 0x00FF,
			B2 = t & 0x0000FF,
			r = Math.round((R2 - R1) * p) + R1,
			g = Math.round((G2 - G1) * p) + G1,
			b = Math.round((B2 - B1) * p) + B1;

		return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
	};
}