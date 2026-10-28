<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the storefront as a single public route with browser-session cart state; purchasing completes through WhatsApp because no payment backend is connected.
- Keep ordered catalog photography in a dedicated gallery module and separate material, craft, occasion, and gifting sections so image roles never mix.
- Keep collection models, confirmed color photo groups, and cart identity in a shared collection module; product cards and detail sheets consume it so each model/color quotes separately without duplicating catalog rules.
