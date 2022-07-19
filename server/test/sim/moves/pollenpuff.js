'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Pollen Puff', function () {
	afterEach(function () {
		battle.destroy();
	});

	it(`should heal allies through Substitute, but not damage opponents through Substitute`, function () {
		battle = common.createBattle({gameType: 'doubles'}, [[
			{species: "Wynaut", level: 1, moves: ['pollenpuff']},
			{species: "Garchomp", ability: 'compoundeyes', moves: ['superfang']},
		], [
			{species: "Wobbuffet", moves: ['pollenpuff']},
			{species: "Lucario", moves: ['substitute']},
		]]);

		battle.makeChoices('move pollenpuff 2, move superfang 2', 'move pollenpuff -2, move substitute');
		const lucario = battle.p2.active[1];

		// -1/2 from Super Fang, -1/4 from Sub, +1/2 from Pollen Puff, damaged Sub.
		assert.equal(lucario.hp, lucario.maxhp - Math.floor(lucario.maxhp / 4));
	});
});
