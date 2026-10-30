# Fotos revisadas: remoção de marcas e interface

Data: 2026-10-25. Modo: ferramenta integrada `image_gen`, edição generativa. Entradas: fotografias originais da pasta Downloads, sem usar as versões clareadas. Verificação visual realizada.

Versões atuais: `felipe-costao-v2.png`, `felipe-caminho-v2.png`, `felipe-floresta-v2.png`. Estas substituem as anteriores na seleção de imagens do projeto. Não foram integradas à interface.

Escopo: remoção de Nike AIR/Nike/Lacoste e dos ícones ou contadores do Instagram. Nenhuma correção de iluminação ou cor solicitada. Os prompts instruem a preservar a aparência original; a edição generativa pode alterar pequenos detalhes. Originais e versões anteriores preservados.

## Prompts finais

### Costão

Use case: precise-object-edit. Input image 1 is the sole EDIT TARGET: ORIGINAL photograph, not the previously brightened version. Perform strictly local removal ONLY: erase the pink Nike swoosh AND AIR text on the navy T-shirt, reconstruct matching navy fabric; erase the top-right '2/6' badge and bottom-right mute button, reconstruct matching sky and foliage. LOCK ALL other pixels/appearance as closely as possible. Absolutely NO lighting, exposure, shadows, highlights, contrast, saturation, white balance, sharpness or skin retouch adjustments. In particular KEEP the original deep dark shadow under the jaw and across the neck, and the original original face brightness. Preserve exact face/identity/expression/hair/pose/body/clothes/background/composition/aspect ratio. Do not beautify, redraw the person, crop, relight, brighten or improve the photograph. Only small localized inpainting of the brand marks and Instagram overlays, with original lighting and colors everywhere else. Return one photograph.

### Caminho

Use case: precise-object-edit. Image 1 is the sole EDIT TARGET: ORIGINAL dark warm-toned photo of a person in a black/teal striped shirt beneath trees beside a green wall. Make ONLY two local edits: remove the small white Lacoste crocodile on the chest and restore the exact surrounding stripe pattern/fabric; remove the bottom-right Instagram circular mute/sound icon and restore the underlying cobblestones. Absolutely preserve the ORIGINAL DARK EXPOSURE AND WARM COLOR CAST, including deep dark shadows on the face, arms, shorts and trees. NO brightening, lifting shadows, color correction, relighting, contrast change, white balance adjustment, sharpening, denoising, beauty retouching or enhancement. Preserve face, identity, facial proportions, eyes, nose, mouth, gaze, expression, hair, body, pose, hands, clothing, background and framing as closely as possible. This is only tiny localized inpainting of a clothing logo and UI badge; everything else must remain as in the source. Return a single photo with original lighting.

### Floresta

Use case: precise-object-edit. Image 1 is the sole EDIT TARGET: ORIGINAL photo of a seated person wearing a white T-shirt in dense greenery. Only perform tiny localized inpainting: remove the small black Nike swoosh from the chest, restoring the existing white fabric texture, wrinkles and ORIGINAL shading; remove the top-right '1/2' Instagram badge, restoring the underlying leaves/vines. Preserve original lighting EXACTLY, especially the dark face and neck in shade, the original shirt brightness, green tones and background highlights. NO exposure adjustment, shadow lifting, brightening, color grading, white balance, contrast, saturation, sharpening, skin retouch or enhancement. Keep the exact facial features/identity/hair/expression/gaze/body/pose/arms/clothing fit, all background details, original framing and aspect ratio. Do not redraw, beautify, crop or relight. The user explicitly withdrew permission for illumination changes: only remove the logo and UI overlay, leaving the original photograph appearance intact everywhere else. Return one edited photo.
