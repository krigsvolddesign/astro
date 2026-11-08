import {checkDashboardFamily} from './dashboard-family-check.mjs';
import { cp, mkdtemp, readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const core=process.env.KRIGSVOLD_CORE_SOURCE?resolve(process.env.KRIGSVOLD_CORE_SOURCE):null;
const pin=JSON.parse(await readFile(join(root,'docs-release-lock.json'),'utf8'));
const temp=await mkdtemp(join(tmpdir(),'krigsvold-packed-'));
try {
  const pack=cwd=>JSON.parse(execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',temp],{cwd,encoding:'utf8',stdio:['ignore','pipe','inherit']}))[0].filename;
  const coreArchive=core?pack(core):null,astroArchive=pack(root);
  const site=join(temp,'site');await cp(join(root,'starter'),site,{recursive:true});await mkdir(join(site,'vendor'));
  // The shipped demos have no contents by default. This isolated consumer
  // explicitly enables their optional API specimen for the existing checks.
  for(const name of ['article','documentation']) {
    const file=join(site,'src/pages',name+'.astro'),source=await readFile(file,'utf8');
    assert.match(source,/const show_toc = false;/,'Stock '+name+' leaves contents off');
    await writeFile(file,source.replace('const show_toc = false;','const show_toc = true;'));
  }
  for(const archive of [coreArchive,astroArchive].filter(Boolean))await cp(join(temp,archive),join(site,'vendor',archive));
  const pkg=JSON.parse(await readFile(join(site,'package.json'),'utf8'));
  pkg.dependencies['@krigsvold/core']=core?'file:vendor/'+coreArchive:pin.core.version;
  pkg.dependencies['@krigsvold/astro']='file:vendor/'+astroArchive;
  if(process.env.KRIGSVOLD_ASTRO_VERSION)pkg.dependencies.astro=process.env.KRIGSVOLD_ASTRO_VERSION;
  await writeFile(join(site,'package.json'),JSON.stringify(pkg,null,2)+'\n');
  execFileSync('npm',['install','--ignore-scripts','--no-audit','--no-fund'],{cwd:site,stdio:'inherit',timeout:180000});
  if(!core){const lock=JSON.parse(await readFile(join(site,'package-lock.json'),'utf8')),installed=lock.packages?.[`node_modules/${pin.core.name}`];assert.equal(installed?.version,pin.core.version);assert.equal(installed?.integrity,pin.core.integrity);}
  execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit',timeout:180000,env:{...process.env,NIGHTJAR_BASE:'/'}});
  await checkDashboardFamily(join(site,'dist'),'krigsvold');
  const html=await readFile(join(site,'dist/index.html'),'utf8');
  assert.match(html,/data-krigsvold="light"/);
  assert.match(html,/<h1\b[^>]*>Krigsvold, in plain sight\.<\/h1>/,'The root is the family reference homepage');
  assert.match(html,/Krigsvold Astro/);
  assert.match(html,/data-hero-variant="signature"/);
  assert.match(html,/aria-label="Primary navigation"/);
  assert.match(html,/<footer\b[^>]*class="[^"]*\bsite-footer\b/);
  assert.equal((html.match(/<main\b/g)||[]).length,1,'The reference homepage has one main landmark');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'The reference homepage has one page heading');
  const hero=html.match(/\bsrc="(\/assets\/images\/hero\/krigsvold-hero-\d+\.webp)"/)?.[1];
  assert.ok(hero,'The approved signature image is referenced by the homepage');
  assert.ok((await readFile(join(site,'dist',hero.slice(1)))).length>0,'The consuming build contains the approved signature image');
  // The layout laboratory retains simultaneous light/dark component coverage;
  // the canonical homepage is no longer a generic component demonstration.
  const layoutsHtml=await readFile(join(site,'dist/layouts/index.html'),'utf8');
  assert.match(layoutsHtml,/data-krigsvold="light"/);assert.match(layoutsHtml,/data-krigsvold="dark"/);
  const formHtml=await readFile(join(site,'dist/form/index.html'),'utf8');
  assert.match(formHtml,/id="main-content"/);
  assert.match(formHtml,/type="button"[^>]*disabled|disabled[^>]*type="button"/);
  for(const [id,type] of [['submit','submit'],['reset-button','reset'],['default-button','button']]) {
    const tag=formHtml.match(new RegExp('<button\\b[^>]*id="'+id+'"[^>]*>'))?.[0];
    assert.ok(tag,id+' exists'); assert.equal((tag.match(/\btype=/g)||[]).length,1,'Exactly one type attribute for '+id);
    assert.match(tag,new RegExp('type="'+type+'"'));
  }
  const assets=join(site,'dist/_astro');const files=await readdir(assets);
  const css=(await Promise.all(files.filter(x=>x.endsWith('.css')).map(x=>readFile(join(assets,x),'utf8')))).join('\n');
  for(const family of ['Roboto','Roboto Slab','Roboto Mono'])assert.ok(css.includes(family),family);
  assert.ok(files.some(x=>x.endsWith('.woff2')),'Local fonts are emitted by the consuming build');
  assert.doesNotMatch(css,/fonts\.googleapis\.com|fonts\.gstatic\.com|Space Grotesk|DM Sans/);
  for (const route of ['article','documentation','layouts','form']) {
    const page=await readFile(join(site,'dist',route,'index.html'),'utf8');
    assert.equal((page.match(/<main\b/g)||[]).length,1,route+' should have one main landmark');
    assert.equal((page.match(/<h1\b/g)||[]).length,1,route+' should have one page h1');
    assert.match(page,/aria-label="Primary navigation"/);assert.match(page,/<footer\b[^>]*class="[^"]*\bsite-footer\b/);
  }
  const article=await readFile(join(site,'dist/article/index.html'),'utf8');
  assert.match(article,/name="example-head" content="forwarded"/);
  assert.match(article,/id="body-end-example"/);
  assert.ok(article.indexOf('krigsvold-sidebar__main')<article.indexOf('krigsvold-sidebar__aside'));
  assert.match(article,/<nav aria-label="Manual contents"/);
  assert.match(article,/<li><a href="#question">[^<]+<\/a><ul><li><a href="#detail">/);
  assert.ok(article.indexOf('krigsvold-reading-layout__body') < article.indexOf('krigsvold-reading-layout__contents'));
  assert.ok(article.indexOf('krigsvold-reading-layout__contents') < article.indexOf('id="question"'));
  assert.ok(article.indexOf('krigsvold-reading-layout__body') < article.indexOf('krigsvold-sidebar__aside'));
  assert.match(article,/krigsvold-site-footer--grouped/);
  assert.equal((article.match(/class="krigsvold-site-footer__group"/g)||[]).length,4);
  assert.ok(article.includes('Krigsvold Astro') && article.includes('A website of James Howard'),'Identity slot reaches the grouped footer');
  assert.ok(article.includes('Copyright © 2026 James P. Howard, II'),'Base slot reaches the grouped footer');
  const guide=await readFile(join(site,'dist/documentation/index.html'),'utf8');
  assert.match(guide,/<nav aria-label="Manual contents"/);
  assert.ok(!guide.includes('krigsvold-sidebar__aside'),'Inline manual contents do not create a margin sidebar');
  assert.ok(guide.indexOf('krigsvold-reading-layout__contents')<guide.indexOf('id="install"'));
  for (const route of ['language','examples/faq','examples/changelog','examples/report']) {
    const html=await readFile(join(site,'dist',route,'index.html'),'utf8');
    assert.doesNotMatch(html,/aria-label="(?:On this page|Report sections|Manual contents)"/,route+' must not insert automatic contents');
  }
  const language=await readFile(join(site,'dist/language/index.html'),'utf8');
  for(const id of ['relationships','hierarchy','states','boundaries'])assert.ok(language.includes('id="'+id+'"'),'Stable language heading remains: '+id);
  if(process.env.KRIGSVOLD_BROWSER === '1') execFileSync(process.execPath,[join(root,'scripts/browser.mjs'),join(site,'dist')],{cwd:root,stdio:'inherit',timeout:210000});
  if(process.env.KRIGSVOLD_BROWSER === '1') execFileSync(process.execPath,[join(root,'scripts/dashboard-resize-check.mjs'),join(site,'dist'),'/'],{cwd:root,stdio:'inherit',timeout:70000});
  if(process.env.KRIGSVOLD_BROWSER === '1') execFileSync(process.execPath,[join(root,'scripts/placeholder-contrast-check.mjs'),join(site,'dist'),'/'],{cwd:root,stdio:'inherit',timeout:70000});
  // A host may install this starter beneath a prefix; test its emitted internal URLs.
  execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit',timeout:180000,env:{...process.env,NIGHTJAR_BASE:'/preview/'}});
  await checkDashboardFamily(join(site,'dist'),'krigsvold');
  execFileSync(process.execPath,[join(root,'scripts/subpath-check.mjs'),join(site,'dist')],{cwd:root,stdio:'inherit',timeout:30000});
  if(process.env.KRIGSVOLD_BROWSER === '1') execFileSync(process.execPath,[join(root,'scripts/dashboard-resize-check.mjs'),join(site,'dist'),'/preview/'],{cwd:root,stdio:'inherit',timeout:70000});
  if(process.env.KRIGSVOLD_BROWSER === '1') execFileSync(process.execPath,[join(root,'scripts/placeholder-contrast-check.mjs'),join(site,'dist'),'/preview/'],{cwd:root,stdio:'inherit',timeout:70000});
  if(process.env.KRIGSVOLD_KEEP_FIXTURE) console.log('Packed starter fixture: '+temp);
  console.log('Packed starter build passed: both modes, all font roles, local font assets, and native button behavior.');
} finally { if (!process.env.KRIGSVOLD_KEEP_FIXTURE) await rm(temp,{recursive:true,force:true}); }
