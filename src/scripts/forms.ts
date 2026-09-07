import { getEquipment } from '../data/catalog';
import { validate, normalize, durationLabels, localToday, type Values, type FormKind, type Errors } from '../lib/form-rules';

document.querySelectorAll<HTMLFormElement>('[data-request-form]').forEach((form) => {
  const kind = form.dataset.requestForm as FormKind;
  const wizard = kind === 'location';
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
  const next = form.querySelector<HTMLButtonElement>('[data-next]')!;
  const back = form.querySelector<HTMLButtonElement>('[data-back]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')!;
  const recap = form.querySelector<HTMLElement>('[data-recap]')!;
  let current = 0;
  let sending = false;
  form.noValidate = true;
  form.classList.add('is-enhanced');
  const values = (): Values => normalize(Object.fromEntries(Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value)])), kind);
  const control = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  const syncConditions = () => {
    if (wizard) {
      const field = form.querySelector<HTMLElement>('[data-driver-field]')!;
      const driver = control('operateur')!;
      const relevant = control('materiel')?.value === 'mini-pelle';
      field.hidden = !relevant; driver.disabled = !relevant; driver.required = relevant;
      if (!relevant) driver.value = '';
    }
    const date = control('date')!;
    const flexible = (control('date-flexible') as HTMLInputElement).checked;
    date.disabled = flexible; date.required = !flexible;
    (date as HTMLInputElement).min = localToday();
    if (flexible) date.value = '';
    if (!wizard) {
      const flexibleTrip = (control('trajet-flexible') as HTMLInputElement).checked;
      const destination = control('destination')!;
      destination.disabled = flexibleTrip; destination.required = !flexibleTrip;
      if (flexibleTrip) destination.value = '';
    }
  };
  const clearErrors = () => {
    summary.hidden = true;
    summary.querySelector('ul')!.replaceChildren();
    form.querySelectorAll('[aria-invalid]').forEach((field) => { field.removeAttribute('aria-invalid'); field.removeAttribute('aria-describedby'); });
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((error) => { error.hidden = true; error.textContent = ''; });
  };
  const showErrors = (errors: Errors) => {
    clearErrors();
    for (const [name, message] of Object.entries(errors)) {
      const input = control(name);
      const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (!input || !error) continue;
      error.textContent = message; error.hidden = false;
      input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', error.id);
      const li = document.createElement('li'); const link = document.createElement('a');
      link.href = `#${input.id}`; link.textContent = message;
      link.addEventListener('click', (event) => { event.preventDefault(); if (wizard) showStep(steps.findIndex((step) => step.contains(input)), false); input.focus(); });
      li.append(link); summary.querySelector('ul')!.append(li);
    }
    summary.hidden = false; summary.focus();
  };
  const updateRecap = () => {
    const v = values();
    const date = v['date-flexible'] === 'oui' ? 'À définir' : v.date ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(`${v.date}T12:00:00`)) : 'À préciser';
    const rows = wizard ? [ ['Matériel', getEquipment(v.materiel)?.name || 'Autre demande'], ...(v.materiel === 'mini-pelle' ? [['Formule', v.operateur === 'avec' ? 'Avec chauffeur' : 'Sans chauffeur']] : []), ['Date', date], ['Durée', durationLabels[v.duree] || 'À préciser'], ['Commune', v.commune] ] : [['Prestation', 'Porsche Panamera avec chauffeur'], ['Date', date], ['Horaire', v.horaire || 'À préciser'], ['Départ', v.depart || 'À préciser'], ['Destination', v['trajet-flexible'] === 'oui' ? 'À préciser avec MK' : v.destination || 'À préciser']];
    const dl = recap.querySelector('dl')!; dl.replaceChildren();
    for (const [label, value] of rows) { const group = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; group.append(dt, dd); dl.append(group); }
    recap.hidden = false;
  };
  function showStep(index: number, focus = true) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    if (wizard) {
      steps.forEach((step, i) => { step.hidden = i !== current; });
      form.querySelectorAll<HTMLElement>('[data-progress]').forEach((item, i) => { if (i === current) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current'); item.classList.toggle('is-complete', i < current); });
      back.hidden = current === 0; next.hidden = current === steps.length - 1; submit.hidden = current !== steps.length - 1;
      if (current === 2) updateRecap();
      if (focus) { const legend = steps[current].querySelector('legend')!; legend.tabIndex = -1; legend.focus(); }
    }
  }
  const query = new URLSearchParams(window.location.search);
  if (wizard && getEquipment(query.get('materiel'))) control('materiel')!.value = query.get('materiel')!;
  if (wizard && query.has('materiel')) { const url = new URL(window.location.href); url.searchParams.delete('materiel'); window.history.replaceState(null, '', url); }
  syncConditions();
  if (wizard) showStep(0, false);
  else updateRecap();
  form.addEventListener('change', () => { syncConditions(); if (!wizard || current === 2) { if (!validate(values(), kind, wizard ? current : undefined).date) updateRecap(); } });
  next?.addEventListener('click', () => { clearErrors(); const errors = validate(values(), kind, current); if (Object.keys(errors).length) showErrors(errors); else showStep(current + 1); });
  back?.addEventListener('click', () => { clearErrors(); showStep(current - 1); });
  form.querySelector('[data-edit-step]')?.addEventListener('click', () => { clearErrors(); showStep(0); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    syncConditions(); clearErrors();
    if (wizard && current < steps.length - 1) {
      const stepErrors = validate(values(), kind, current);
      if (Object.keys(stepErrors).length) showErrors(stepErrors); else showStep(current + 1);
      return;
    }
    const data = values(); const errors = validate(data, kind);
    if (Object.keys(errors).length) { if (wizard) { const first = control(Object.keys(errors)[0]); showStep(steps.findIndex((step) => !!first && step.contains(first)), false); } showErrors(errors); return; }
    if (form.dataset.enabled !== 'true') { status.textContent = 'L’envoi n’est pas encore disponible. Votre saisie est conservée dans cette page.'; return; }
    sending = true; submit.disabled = true; if (back) back.disabled = true; form.querySelector<HTMLButtonElement>('[data-edit-step]')?.setAttribute('disabled', ''); form.setAttribute('aria-busy', 'true'); status.textContent = 'Envoi de votre demande…';
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString(), signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error('Submission failed');
      try { sessionStorage.setItem('mk-request-sent', kind); } catch { /* The server response still confirms acceptance when storage is unavailable. */ }
      window.location.assign('/demande-envoyee');
    } catch {
      status.textContent = 'L’envoi n’a pas pu être confirmé. Vos réponses sont conservées. Réessayez ou contactez MK via les coordonnées disponibles sur le site.';
      sending = false; submit.disabled = false; if (back) back.disabled = false; form.querySelector('[data-edit-step]')?.removeAttribute('disabled'); form.removeAttribute('aria-busy');
    }
  });
});
