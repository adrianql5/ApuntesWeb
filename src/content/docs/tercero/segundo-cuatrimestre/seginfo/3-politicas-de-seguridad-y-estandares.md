---
title: "Políticas de seguridad y estándares"
---

# 3.1 Enfoque general de la seguridad

La seguridad de la información debe entenderse como un **proceso**, no como un producto. No basta con comprar herramientas: hace falta adoptar políticas y procedimientos, implantar medidas técnicas, gestionar los incidentes de seguridad y someter el sistema a auditorías continuas.

Ese proceso persigue tres metas clásicas. La **prevención** intenta evitar que se viole la política de seguridad; la **detección** busca descubrir que la política se ha violado; y la **recuperación** trata de detener el ataque, evaluar y reparar daños y seguir funcionando incluso si el ataque tuvo éxito.

Aquí conviene distinguir dos ideas que suelen confundirse. La **política de seguridad** dice qué está permitido; los **mecanismos** o **controles** explican cómo se hace cumplir esa política. El tipo de política depende del tamaño y la naturaleza de la organización. En entornos militares o gubernamentales suele priorizarse la confidencialidad, mientras que en entornos comerciales suelen pesar más la integridad y la disponibilidad.

# 3.2 Políticas y controles en la práctica

Como ejemplos de políticas, el tema menciona una política de contraseñas y una política de software. En la de contraseñas se propone generación automatizada mediante algoritmo, longitud mínima de 10 caracteres, combinación de mayúsculas, minúsculas, números y caracteres especiales, y cambio periódico, por ejemplo cada tres meses, según el procedimiento establecido. En la política de software se fija que no está permitido instalar programas o aplicaciones sin autorización del responsable correspondiente. En clase se citó como referencia habitual a **INCIBE**, tanto por modelos de políticas como por planes directores de seguridad.

Los mecanismos o controles son las medidas concretas que aseguran el cumplimiento de una parte de la política. Pueden ser técnicos, físicos u organizativos. El tema pone como ejemplo los controles de acceso como la autenticación biométrica, la restricción de dispositivos externos en salas de ordenadores y los procedimientos para controlar instalación, copia o acceso.

# 3.3 Para qué sirven los estándares

Los estándares de seguridad aportan interoperabilidad y uniformidad, facilitan la certificación y ayudan a ordenar soluciones de seguridad muy diversas. No existe un estándar único perfecto para todo: depende del servicio que presta la organización y también de su tamaño, porque eso influye mucho en la facilidad de implantación y gestión.

Entre los ejemplos citados aparecen el **Orange Book**, como criterios del Departamento de Defensa de Estados Unidos; **BS 7799**, como guía histórica de gestión de seguridad; **COBIT**, marco creado por ISACA para gobierno, auditoría y control de TI; la **familia ISO/IEC 27000**; y el **Esquema Nacional de Seguridad (ENS)**.

El **ENS** es el marco español aplicable a administraciones y entidades sujetas a él. Está regulado por el **Real Decreto 311/2022, de 3 de mayo**, y sirve como referencia para requisitos, adecuación y certificación en el sector público.

# 3.4 ISO/IEC 27001 e ISO/IEC 27002

La familia **ISO/IEC 27000** es un conjunto de normas dedicadas a la seguridad de la información y puede aplicarse en organizaciones públicas o privadas, grandes o pequeñas. Las normas destacadas del tema son: **ISO/IEC 27001**, que es la principal y la única certificable; **ISO/IEC 27002**, guía de buenas prácticas y controles; **ISO/IEC 27003**, implementación; **ISO/IEC 27004**, métricas y medición; **ISO/IEC 27005**, gestión de riesgos; **ISO/IEC 27006**, requisitos de acreditación; **ISO/IEC 27010**, gestión de información compartida; **ISO/IEC 27034**, seguridad en aplicaciones; e **ISO/IEC 27799**, aplicación en el ámbito sanitario.

La **ISO/IEC 27001** está orientada sobre todo a aspectos organizativos. Su idea central es organizar la seguridad de la información y definir requisitos para establecer, implementar, operar, monitorizar, revisar, mantener y mejorar un SGSI documentado dentro del contexto de riesgos de la organización. También usa el ciclo **PDCA**: **Plan** para diseñar el SGSI, **Do** para implantar y operar controles, **Check** para revisar eficiencia y eficacia, y **Act** para introducir mejoras.

Los controles de ISO/IEC 27001 deben seleccionarse e implantarse según los requerimientos detectados en el análisis de riesgos. La **ISO/IEC 27002** recoge el catálogo de buenas prácticas asociado. En la estructura vista en clase aparecen **114 controles**, agrupados en **35 objetivos de control** y **14 dominios**.

Esos dominios son: políticas de seguridad; aspectos organizativos de la seguridad; seguridad en recursos humanos; gestión de activos; control de accesos; cifrado; seguridad física y del entorno; seguridad en las operaciones; gestión de las telecomunicaciones; adquisición, desarrollo y mantenimiento; relaciones con proveedores; gestión de incidentes de seguridad; gestión de la continuidad del negocio; y cumplimiento. A grandes rasgos, cubren la orientación general, la organización interna, la formación y responsabilidades del personal, la identificación y clasificación de activos, la limitación de accesos, el uso correcto de criptografía y claves, la protección física, la operación segura de sistemas, la protección de redes y comunicaciones, la seguridad a lo largo del ciclo de vida del software, la relación con terceros, el tratamiento de incidentes, la continuidad del negocio y la revisión del cumplimiento legal, contractual e interno.

# 3.5 Ejemplo público y repaso

Como ejemplo en administración pública, el tema menciona el plan director de seguridad TIC de la Xunta de Galicia, articulado en cinco dimensiones: formación y concienciación, cumplimiento normativo, marco organizativo, marco operacional y medidas de protección.

Para examen, las ideas básicas son estas: la política dice qué se permite y el control explica cómo se hace cumplir; la seguridad combina prevención, detección y recuperación; los estándares sirven para ordenar, implantar y auditar la seguridad; **ISO/IEC 27001** es la referencia central para SGSI y la única certificable de la familia; **ISO/IEC 27002** desarrolla los controles de buenas prácticas; y el **ENS** es la referencia principal del sector público español.