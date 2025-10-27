---
id: 9b6d5755c9
lastUpdated: 2025-10-27T12:05:34.000Z
title: index.md
---

---

title: Ejemplo docu

id: 32423424dd

lastUpdated: 2025-03-10T16:35:06.000Z

  
  

import { Steps } from '@astrojs/starlight/components';

import { Aside } from '@astrojs/starlight/components';

import { Card } from '@astrojs/starlight/components';

import { LinkCard } from '@astrojs/starlight/components';

import { CardGrid } from '@astrojs/starlight/components';

import { Badge } from '@astrojs/starlight/components';

import { Code } from '@astrojs/starlight/components';

import { FileTree } from '@astrojs/starlight/components';

import { Icon } from '@astrojs/starlight/components';

import { LinkButton } from '@astrojs/starlight/components';

import { Tabs, TabItem } from '@astrojs/starlight/components';

---

  

Ejemplo de cositas que se pueden hacer

  

# Pasitos

  

import { Steps } from  '@astrojs/starlight/components';

  

<Steps>

  

1. Import the component into your MDX file:

  

```js

import { Steps } from  '@astrojs/starlight/components';

```

  

2. Wrap `<Steps>` around your ordered list items.

  

</Steps>

  

# Aside

  

import { Aside } from  '@astrojs/starlight/components';

  

<Aside>Some content in an aside.</Aside>

  

<Aside type="caution">Some cautionary content.</Aside>

  

<Aside type="tip">

  

Other content is also supported in asides.

  

```js

// A code snippet, for example.

```

  

</Aside>

  

<Aside type="danger">Do not give your password to anyone.</Aside>

  

# Cards

  

import { Card } from  '@astrojs/starlight/components';

  

<Card title="Stars"  icon="star">

Sirius, Vega, Betelgeuse

</Card>

  

# Link Cards

  

import { LinkCard } from  '@astrojs/starlight/components';

  

<LinkCard

title="Enlace"

href="https://instagram.com/javimogan"

description="Un enlaceeee"

  

/>

  

# Agrupar tarjetas

  

import { CardGrid } from  '@astrojs/starlight/components';

  

<CardGrid>

<Card title="Check this out"  icon="open-book">

Interesting content you want to highlight.

</Card>

<Card title="Other feature"  icon="information">

More information you want to share.

</Card>

</CardGrid>

  

# Badge

  

import { Badge } from  '@astrojs/starlight/components';

  

- <Badge text="Note"  variant="note"  />

- <Badge text="Success"  variant="success"  />

- <Badge text="Tip"  variant="tip"  />

- <Badge text="Caution"  variant="caution"  />

- <Badge text="Danger"  variant="danger"  />

  
  

# Code

  

import { Code } from  '@astrojs/starlight/components';

  

export  const exampleCode = `console.log('This could come from a file or CMS!');`;

export  const fileName = 'example.js';

export  const highlights = ['file', 'CMS'];

  

<Code code={exampleCode}  lang="js"  title={fileName}  mark={highlights}  />

  

# Imported code

  

import importedCode from  '/tsconfig.json?raw';

  

<Code code={importedCode}  lang="json"  title="tsconfig.json"  />

  
  

# File tree

  

import { FileTree } from  '@astrojs/starlight/components';

  

<FileTree>

  

- astro.config.mjs

- package.json

- src

- components

- Header.astro

- Title.astro

- pages/

  

</FileTree>

  

# Icons

  

import { Icon } from  '@astrojs/starlight/components';

  

<Icon name="star"  color="goldenrod"  size="2rem"  />

<Icon name="rocket"  color="var(--sl-color-text-accent)"  />

  

# Botones con enlace

  

import { LinkButton } from  '@astrojs/starlight/components';

  

<LinkButton href="/getting-started/">Get started</LinkButton>

<LinkButton href="/reference/configuration/"  variant="secondary">

Configuration Reference

</LinkButton>

  

# Tabs

  

import { Tabs, TabItem } from  '@astrojs/starlight/components';

  

<Tabs>

<TabItem label="Stars">Sirius, Vega, Betelgeuse</TabItem>

<TabItem label="Moons">Io, Europa, Ganymede</TabItem>

</Tabs>
<!--stackedit_data:
eyJoaXN0b3J5IjpbODk2MDY5MDUsNTE2OTkzMTc5XX0=
-->
