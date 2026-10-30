# Registro da edição de fotos

> Histórico da primeira edição. Use as [versões revisadas v2](REVISAO-v2.md), refeitas a partir dos originais sem solicitar ajustes de iluminação ou cor.

Data: 2026-10-25. Modo: ferramenta integrada `image_gen`, edição generativa com uma foto de entrada por chamada. Originais preservados na pasta Downloads. As imagens foram conferidas visualmente; não foram integradas à interface.

| Cópia editada | Original | Ajustes |
| --- | --- | --- |
| felipe-costao-edited.png | WhatsApp Image 2026-10-25 at 19.26.42 (1).jpeg | Remoção de 2/6, ícone de som, Nike AIR e ajuste de sombras. |
| felipe-caminho-edited.png | WhatsApp Image 2026-10-25 at 19.22.27.jpeg | Remoção do ícone de som e Lacoste; ajuste de exposição e cor. |
| felipe-floresta-edited.png | WhatsApp Image 2026-10-25 at 19.26.42.jpeg | Remoção de 1/2 e Nike; ajuste de sombras. |

Por ser edição generativa, pequenos detalhes podem variar em relação às fotografias originais.

## Prompts utilizados

### Costão

Use case: precise-object-edit. Input image 1 is the sole EDIT TARGET, a real portrait photo. Carefully retouch this exact photo, preserving identity and photographic realism. Remove the top-right Instagram '2/6' badge and bottom-right circular mute/sound icon, reconstructing the sky and foliage naturally. Remove the entire pink Nike swoosh and AIR lettering from the navy shirt, reconstructing plain navy fabric with its existing folds, texture and shading. Subtly lift deep shadows on the face and neck only enough to improve visibility while retaining sunny outdoor lighting and natural skin tones. Preserve the exact face, expression, hair, body, hands, pose, rocks, plants, sky, framing and aspect ratio. No beauty retouching, reshaping, new objects, crop, stylization, new text or logos. Output only the edited single photograph.

### Caminho

Use case: precise-object-edit. Input image 1 is the sole EDIT TARGET, an existing real full-body photograph under trees beside a green wall and stone walkway. Retouch this exact photo. Remove the bottom-right Instagram circular mute/sound icon, seamlessly reconstructing the stone walkway. Remove the small white Lacoste crocodile emblem on the striped shirt, seamlessly continuing the existing black/teal stripes, fabric texture and folds. Improve the underexposed lighting: gently lift shadows on the person, especially the face, and moderately lift exposure while protecting bright background highlights and retaining natural dappled shade. Gently reduce the excessive warm brown cast; keep believable skin tones and green foliage. Preserve the exact person's identity, facial structure, gaze, expression, hairstyle, body proportions, pose, hands, clothing shape, stripe spacing, background, perspective, full portrait framing and aspect ratio. No beauty retouching, facial reconstruction, artificial HDR, blur, new objects, crop, text or logos. Only requested cleanup and natural photographic exposure correction. Output one edited photograph.

### Floresta

Use case: precise-object-edit. Input image 1 is the sole EDIT TARGET, the real portrait of a seated young man in a white shirt against dense forest greenery. Perform careful minimal photographic retouching of this exact image. Remove the top-right Instagram '1/2' badge, seamlessly reconstructing the leaves, vines and background behind it. Remove the black Nike swoosh from the white shirt, preserving the cloth texture, creases and natural shadows, leaving a plain white shirt. Naturally improve lighting by gently lifting the deep facial and body shadows so facial features are easier to see, while retaining soft outdoor shade and protecting the white shirt and bright leaves from overexposure. Preserve the exact identity, facial structure, nose, lips, eyes, expression, gaze, hairstyle, skin texture, body proportions, pose, arms, clothing fit, background plants, camera angle, portrait framing and original aspect ratio. No beauty retouching, face redesign, reshaping, crop, replacement background, artificial glow, HDR, new text or logos. Change only the requested UI/logo removals and restrained exposure correction. Output one edited photograph.
