import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('legacy Astro search styling does not override Core control appearance', async () => {
  const shell = await readFile(new URL('../reference/public/assets/css/reference.css', import.meta.url), 'utf8');
  const rule = shell.match(/\.site-search-input\s*\{([^}]*)\}/);
  assert.ok(rule, 'the host search layout hook must still exist');
  assert.match(rule[1], /\bmargin\s*:/, 'the host may retain search layout spacing');
  assert.doesNotMatch(rule[1], /(?:^|;)\s*(?:padding(?:-[\w-]+)?|font(?:-[\w-]+)?|border(?:-[\w-]+)?|background|color|height|min-height)\s*:/, 'Core must own the appearance of native controls');
  const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(styles, /@import ['"]@krigsvold\/core\/full\.css['"]/, 'Astro must consume canonical Core styles');
});
