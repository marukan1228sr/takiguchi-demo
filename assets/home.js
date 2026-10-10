document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.tfg-menu');
  const nav = document.querySelector('.tfg-nav');
  if (button && nav) {
    button.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.tfg-season-range,.tfg-season-note,.tfg-season-link,.tfg-hero-copy,.tfg-hero-photo,.tfg-photo-gallery figure,.tfg-variant-card,.tfg-heading,.tfg-card,.tfg-story-photo,.tfg-story-copy,.tfg-values>div,.tfg-order,.tfg-product-card,.tfg-split>*,.tfg-product-lead>*');
  if (!reduceMotion && ('IntersectionObserver' in window)) document.documentElement.classList.add('tfg-motion');
  revealTargets.forEach(function (element, index) {
    element.classList.add('tfg-reveal');
    element.style.setProperty('--tfg-delay', Math.min(index % 4, 3) * 90 + 'ms');
  });
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (element) { element.classList.add('is-visible'); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px' });
    revealTargets.forEach(function (element) { observer.observe(element); });
  }
});


document.addEventListener('DOMContentLoaded',()=>{const button=document.querySelector('.tfg-mode-leaf'),dialog=document.querySelector('.tfg-mode-dialog');if(!button||!dialog)return;button.addEventListener('click',()=>{dialog.showModal();dialog.querySelector('.tfg-mode-pin').focus()});dialog.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',async()=>{const pin=dialog.querySelector('.tfg-mode-pin').value,feedback=dialog.querySelector('.tfg-mode-feedback');if(!/^\d{4}$/.test(pin)){feedback.textContent='4桁の番号を入力してください。';return;}const buttons=dialog.querySelectorAll('[data-mode]');buttons.forEach(x=>x.disabled=true);try{const r=await fetch(dialog.dataset.url,{method:'POST',credentials:'same-origin',body:new URLSearchParams({action:'tfg_change_mode',nonce:dialog.dataset.nonce,pin,mode:b.dataset.mode})});const data=await r.json();feedback.textContent=data.data?.message||'変更できませんでした。';if(data.success){dialog.querySelector('.tfg-mode-pin').value='';location.reload()}}catch(e){feedback.textContent='通信できませんでした。もう一度お試しください。'}finally{buttons.forEach(x=>x.disabled=false)}}));});

/* Gentle scroll motion across the whole orchard site. */
document.addEventListener('DOMContentLoaded',()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduce.matches)return;
 const site=document.querySelector('.tfg-site');if(!site)return;
 site.classList.add('tfg-lively');
 const photos=[...document.querySelectorAll('.tfg-hero-photo>img:first-child,.tfg-story-photo img')];
 let scheduled=false;
 const update=()=>{scheduled=false;if(reduce.matches)return;const height=innerHeight;photos.forEach(img=>{const frame=img.parentElement.getBoundingClientRect();if(frame.bottom<0||frame.top>height)return;const progress=Math.max(-1,Math.min(1,(height/2-frame.top-frame.height/2)/height));img.style.setProperty('--photo-drift',progress*22+'px')});};
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update,{passive:true});update();
 const headings=document.querySelectorAll('.tfg-heading h2,.tfg-story h2,.tfg-fruits-intro h2,.tfg-page-hero h1');
 headings.forEach(h=>h.classList.add('tfg-title-motion'));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('tfg-title-shown');observer.unobserve(entry.target)}})},{threshold:.2});headings.forEach(h=>observer.observe(h));}
 else headings.forEach(h=>h.classList.add('tfg-title-shown'));
 document.querySelectorAll('.tfg-card,.tfg-product-card,.tfg-variant-card,.tfg-values>div,.tfg-photo-gallery figure').forEach((el,index)=>el.style.setProperty('--float-delay',-(index%5)*1.1+'s'));
 reduce.addEventListener('change',()=>{if(reduce.matches){site.classList.remove('tfg-lively');photos.forEach(img=>img.style.removeProperty('--photo-drift'));headings.forEach(h=>h.classList.add('tfg-title-shown'));}});
});
(()=>{
 const form=document.querySelector('.tfg-order-form');if(!form)return;
 const data=JSON.parse(document.querySelector('#tfg-shipping-data').textContent);
 const total=document.querySelector('#tfg-live-total');
 function update(){let subtotal=0;form.querySelectorAll('[data-price]').forEach(e=>{subtotal+=Number(e.dataset.price)*Math.max(0,Math.min(30,Number(e.value)||0))});const pref=form.elements.pref.value;const method=form.elements.method.value;const shipping=data.shipping[pref];if(shipping===undefined||!method){total.textContent=`商品合計 ${subtotal.toLocaleString()}円（税込）／お届け先・支払方法を選択してください。`;return}const fee=method==='cod'?data.cod_fee:0;total.textContent=`商品 ${subtotal.toLocaleString()}円 ＋ 送料 ${shipping.toLocaleString()}円 ＋ 手数料 ${fee.toLocaleString()}円 ＝ 合計 ${(subtotal+shipping+fee).toLocaleString()}円（税込）`;}
 form.addEventListener('input',update);form.addEventListener('change',update);
 document.querySelector('#tfg-copy-buyer')?.addEventListener('click',()=>{for(const [source,target] of [['name','recipient'],['phone','recipient_phone'],['billing_zip','zip'],['billing_pref','pref'],['billing_address','address']])form.elements[target].value=form.elements[source].value;update();});
 update();
})();
