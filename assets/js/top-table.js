
(() => {
'use strict';
const DATA_URL="https://777cdnfiles.site/data/aa2bf16e72387e51.php";
const container=document.getElementById('affiliate-table');
if(!container)return;
const safeColor=value=>typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)?value:'#eef3f8';
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};

const render=rows=>{
  container.replaceChildren();
  rows.forEach((item,index)=>{
    const card=make('div','compare-card');

    const logoBox=make('div','logo-box');
    logoBox.style.backgroundColor=safeColor(item.background_color);
    const logo=document.createElement('img');
    logo.src=String(item.logo_url||'');
    logo.alt=item.brand?'Logo '+String(item.brand):'Logo';
    logo.loading=index<3?'eager':'lazy';
    logo.decoding='async';
    logoBox.appendChild(logo);
    card.appendChild(logoBox);

    const info=make('div','brand-wrap');
    info.appendChild(make('div','brand',String(item.brand||'')));
    const raw=Number(item.rating);
    const value=Number.isFinite(raw)?Math.max(0,Math.min(10,raw)):0;
    const rating=make('div','rating');
    const stars=make('span','stars');
    stars.style.setProperty('--fill',(value*10)+'%');
    stars.setAttribute('aria-label',value.toFixed(1)+' sur 10');
    rating.appendChild(stars);
    rating.appendChild(make('span','',value.toFixed(1)+'/10'));
    info.appendChild(rating);
    card.appendChild(info);

    const bonus=make('div','bonus-wrap');
    bonus.appendChild(make('div','bonus-label','Bonus de bienvenue'));
    bonus.appendChild(make('div','bonus-text',String(item.welcome_bonus||'')));
    card.appendChild(bonus);

    const cta=make('a','cta','Jouer');
    cta.href=String(item.cta_url||'#');
    cta.target='_blank';
    cta.rel='nofollow sponsored noopener';
    card.appendChild(cta);

    container.appendChild(card);
  });
};

fetch(DATA_URL,{method:'GET',mode:'cors',credentials:'omit'})
.then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.json();})
.then(data=>{if(!Array.isArray(data))throw new Error('Format inattendu');render(data);})
.catch(()=>container.replaceChildren(make('div','affiliate-error','Le comparatif est temporairement indisponible. Veuillez réessayer plus tard.')));
})();
