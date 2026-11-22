import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeMarqueeOffset,
  computeCardTargetScale,
  computeCardTopOffset,
  computeCharProgressRange,
  computeRingDirection,
  detectPortraitZone,
  validateContactForm,
} from './portfolioLogic';

test('marquee scroll offset follows (scrollY - sectionTop + innerHeight) * 0.3', () => {
  assert.equal(computeMarqueeOffset(900, 900, 900), 270);
  assert.equal(computeMarqueeOffset(0, 900, 900), 0);
});

test('sticky project card targetScale and top offset scale progressively', () => {
  assert.equal(computeCardTargetScale(0, 3), 0.94);
  assert.equal(computeCardTargetScale(1, 3), 0.97);
  assert.equal(computeCardTargetScale(2, 3), 1);
  assert.equal(computeCardTopOffset(0), 0);
  assert.equal(computeCardTopOffset(2), 56);
});

test('animated text character progress range stays strictly within [0, 1]', () => {
  const [s0, e0] = computeCharProgressRange(0, 10);
  const [s9, e9] = computeCharProgressRange(9, 10);
  assert.equal(s0, 0);
  assert.equal(e0, 0.1);
  assert.equal(s9, 0.9);
  assert.equal(e9, 1);
});

test('gaze ring direction resolves cardinal and diagonal vectors accurately', () => {
  assert.equal(computeRingDirection(1, 0), 'e');
  assert.equal(computeRingDirection(-1, 0), 'w');
  assert.equal(computeRingDirection(0, -1), 'n');
  assert.equal(computeRingDirection(0, 1), 's');
});

test('portrait hit zones classify face regions accurately', () => {
  assert.equal(detectPortraitZone(0.5, 0.1), 'hair');
  assert.equal(detectPortraitZone(0.5, 0.34), 'brow');
  assert.equal(detectPortraitZone(0.39, 0.455), 'eyeL');
  assert.equal(detectPortraitZone(0.61, 0.455), 'eyeR');
  assert.equal(detectPortraitZone(0.5, 0.54), 'nose');
  assert.equal(detectPortraitZone(0.5, 0.65), 'mouth');
  assert.equal(detectPortraitZone(0.5, 0.75), 'chin');
  assert.equal(detectPortraitZone(0.66, 0.57), 'cheek');
});

test('contact form validation rejects incomplete submissions and accepts valid ones', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'not-an-email',
    service: '3D Modeling',
    message: 'hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Alex',
    email: 'alex@studio.io',
    service: '3D Modeling',
    message: 'Looking for a custom 3D hero character and product render.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
