import { useEffect, useState } from "react";
import { apiCheckRecipeUrl } from "@/api/client";
import {
  buildGoogleRecipeSearchUrl,
  hostnameForSiteSearch,
} from "@/lib/recipeSearchUrl";

type Props = {
  title: string;
  source: string;
  url: string | null;
};

export default function RecipeSourceLink({ title, source, url }: Props) {
  const [linkHref, setLinkHref] = useState<string>(() =>
    url ?? buildGoogleRecipeSearchUrl(title, source, hostnameForSiteSearch(url))
  );
  const [linkLabel, setLinkLabel] = useState(() =>
    url ? "Voir la source" : "Chercher la recette sur le web"
  );

  useEffect(() => {
    if (!url) {
      setLinkHref(buildGoogleRecipeSearchUrl(title, source, null));
      setLinkLabel("Chercher la recette sur le web");
      return;
    }
    setLinkHref(url);
    setLinkLabel("Voir la source");

    let cancelled = false;
    void (async () => {
      try {
        const result = await apiCheckRecipeUrl(url);
        if (cancelled) return;
        if (
          result.determined &&
          (result.status === 404 || result.status === 410)
        ) {
          setLinkHref(
            buildGoogleRecipeSearchUrl(title, source, hostnameForSiteSearch(url))
          );
          setLinkLabel("Rechercher sur le web (lien source invalide)");
        }
      } catch {
        if (!cancelled) {
          /* réseau ou session : on garde le lien d’origine */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, title, source]);

  const titleAttr =
    url && linkHref !== url
      ? "L’URL enregistrée renvoie une erreur (404) — recherche suggérée à la place."
      : undefined;

  return (
    <>
      {" · "}
      <a href={linkHref} target="_blank" rel="noreferrer" title={titleAttr}>
        {linkLabel}
      </a>
    </>
  );
}
