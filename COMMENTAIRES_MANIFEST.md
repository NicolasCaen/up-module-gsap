# Commentaires compatibles avec `up-bulk-plugins-installer`

## Objectif

- **[Manifest automatique]** Chaque fichier PHP/JS peut générer une entrée de manifest via `build_manifest.py` ou son équivalent local.
- **[Installation assistée]** Les commentaires structurés permettent à `up-bulk-plugins-installer` d’afficher le module et de copier les fichiers dans le thème.

## Format général

Bloc d’en-tête `/** ... */` placé en tout début de fichier.
Chaque ligne suit `Clé: valeur` (respecter la casse).

```text
/**
 * Slug: identifiant-unique
 * Nom: Nom lisible
 * Description: Résumé court
 * Version: 1.0.0
 * Catégories: Catégorie1, Catégorie2
 * Type: php|script|style
 * Files: clé=chemin|clé=chemin
 * Install: clé=destination
 * Preview: chemin/image.png
 */
```

## Clés requises

- **`Slug`** : unique dans le dépôt (ex. `cpt-rooms`).
- **`Nom`** : nom lisible (ex. `Cpt Chambres`).
- **`Description`** : résumé de la fonctionnalité.
- **`Version`** : semver (défaut `1.0.0`).
- **`Catégories`** : liste séparée par `,`, `;` ou `|` (ex. `CPT, Hébergement`).
- **`Type`** : correspond au type principal (`php`, `script`, `style`, `block`, etc.).
- **`Install`** : destination finale selon le type (ex. `php=functions/cpt`, `script=assets/js/gsap`).

## Clés optionnelles

- **`Files`** : fichiers complémentaires (CSS, JS, assets…). Format `clé=chemin` séparé par `,`, `;` ou `|`.
- **`Preview`** : image d’aperçu.
- **`Install (clé)`** : surcharge d’installation spécifique (ex. `Install (style): assets/css`).
- **`Requires`** : dépendances éventuelles (ex. `wp-blocks`, `gsap`).

## Exemples

### Exemple PHP (`inc/up-module-cpt/cpt-rooms.php`)
```php
/**
 * Slug: cpt-rooms
 * Nom: Cpt Chambres
 * Description: Enregistre le Custom Post Type « Rooms » pour gérer les chambres d'hôtel.
 * Version: 1.0.0
 * Catégories: CPT, Hébergement
 * Type: php
 * Install: php=functions/cpt
 */
```

### Exemple Script (`inc/up-module-gsap/gsap-animation-global.js`)
```js
/**
 * Slug: gsap-animation-global
 * Nom: Gsap Animation Global
 * Description: Animations GSAP génériques pour headings, paragraphes, images, colonnes et tables.
 * Version: 1.0.0
 * Catégories: Animation, Frontend
 * Type: script
 * Install: script=assets/js/gsap
 */
```

## Bonnes pratiques

- **[Unicode]** Autorisé, notamment pour les noms/desc (accentuation). Vérifier l’encodage UTF-8.
- **[Alignement]** Garder le bloc au tout début du fichier pour faciliter le parsing.
- **[Synchronisation]** Relancer `python3 build_manifest.py --output manifest.json` après chaque modification.
- **[Versioning]** Incrémenter `Version` lors de changements majeurs pour informer l’installateur.
- **[Sous-modules]** Consulter `AJOUTER_SUBMODULE.md` pour la procédure d’ajout/suppression de sous-modules.

## Générer le manifest

- **[Script générique]** `manifest_build_sample.py` à la racine peut être copié et adapté.
- **[Sous-modules]** Copier le script dans chaque sous-module (`build_manifest.py`) et l’exécuter :
  ```bash
  python3 build_manifest.py --output manifest.json
  ```
- **[Validation]** Vérifier l’onglet manifest dans `up-bulk-plugins-installer` pour s’assurer de la présence du module.
