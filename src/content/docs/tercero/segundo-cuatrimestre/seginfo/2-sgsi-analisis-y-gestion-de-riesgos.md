---
title: "SGSI Análisis y gestión de riesgos"
---

# 2.1 Información, activos y sentido del SGSI

La información es un conjunto de datos organizados que tienen valor para una entidad, y ese valor existe con independencia del formato, del origen o de la fecha. Junto con los procesos y sistemas que la usan, es un activo crítico para la continuidad del negocio. A lo largo de su ciclo de vida la información puede ser creada, almacenada, procesada, transmitida, utilizada correctamente o de forma inadecuada, corrompida, robada, perdida o destruida. Además, puede presentarse en papel, en formato electrónico, transmitida por correo o medios electrónicos, en vídeos corporativos, publicada en la web o incluso de forma verbal.

La ISO/IEC 27001 define la seguridad de la información como la preservación de la **confidencialidad**, la **integridad** y la **disponibilidad**. A estas tres ideas se suelen añadir autenticidad, responsabilidad, no repudio y confiabilidad. También es importante clasificar la información, porque no toda requiere la misma protección. El tema maneja tres niveles: **pública u open**, que puede difundirse sin daño relevante; **interna o propietaria**, cuya divulgación no autorizada sería inapropiada o inconveniente; y **confidencial o restringida**, que es especialmente sensible o valiosa y no debe salir de la organización sin autorización expresa. Esa clasificación afecta al marcado de documentos, las copias permitidas, la distribución interna o externa, los controles físicos y administrativos y el método de destrucción.

Dentro de este marco aparece el **SGSI**, el Sistema de Gestión de la Seguridad de la Información. No es una herramienta aislada, sino un proceso sistemático, documentado, conocido por la organización, basado en el riesgo empresarial y orientado a la mejora continua. Su finalidad es proporcionar en cada momento el nivel de protección necesario, hacerlo de forma eficiente y mantener la exposición al riesgo por debajo del riesgo asumible por la organización. En la práctica, un SGSI permite conocer los riesgos, asumirlos, minimizarlos, transferirlos o controlarlos, y revisar y mejorar continuamente políticas, procedimientos y controles.

# 2.2 Cómo funciona un SGSI

La gestión de un SGSI se apoya en varios principios: la seguridad debe basarse en procedimientos adecuados, los controles deben salir de una evaluación de riesgos, hay que medir la eficacia de esos controles, debe implicarse toda la organización con apoyo activo de la dirección y también deben tenerse en cuenta clientes y proveedores.

El modelo clásico de funcionamiento es el ciclo **PDCA**. En **Plan** se define la política del SGSI, la metodología de evaluación del riesgo, se identifican y evalúan riesgos, se buscan alternativas de tratamiento, se seleccionan objetivos de control y controles, se elabora la Declaración de Aplicabilidad o **SoA**, se obtiene la aprobación de la dirección sobre los riesgos residuales y se autoriza la implantación del sistema. En **Do** se implementa el plan de tratamiento del riesgo, se implantan controles, se forma y conciencia al personal, se gestionan operaciones y recursos y se establecen procedimientos para detectar y responder rápido a incidentes. En **Check** se revisa el SGSI, se mide la eficacia de los controles, se revisan los riesgos residuales, se registran acciones y eventos y se realizan auditorías internas. En **Act** se implantan mejoras, se aplican acciones correctivas y preventivas, se comunican resultados y se comprueba que las mejoras cumplen el objetivo previsto.

# 2.3 Análisis de riesgos

El análisis de riesgos parte de identificar qué hay que proteger. Lo que se protege son **activos**, es decir, todo aquello que tiene valor para la organización y debe defenderse. Un activo de información es cualquier elemento que contiene o manipula información, y cada activo debe tener responsables definidos. El tema da como ejemplos ficheros y bases de datos, contratos y acuerdos, documentación del sistema, manuales de usuario, material de formación, aplicaciones y software de sistema, equipos informáticos y de comunicaciones, servicios informáticos y de comunicaciones, suministros generales como energía o climatización, personas, e incluso elementos menos obvios como el tiempo necesario para reinstalar, recuperar copias o volver a operar, o la propia imagen y reputación de la organización.

Sobre esos activos actúan cuatro conceptos básicos. La **amenaza** es el evento, intencionado o no, que puede dañar un activo. La **vulnerabilidad** es la debilidad que esa amenaza puede explotar. El **impacto** es el daño causado cuando la amenaza explota la vulnerabilidad. El **riesgo** es ese impacto ponderado por la probabilidad o expectativa de ocurrencia. La relación es sencilla: las amenazas explotan vulnerabilidades, eso expone al activo y los controles intentan reducir el riesgo; cuanto mayor es el valor del activo y más altos son sus requisitos de seguridad, más relevante será el riesgo.

Las amenazas pueden venir de empleados, personal temporal o consultores, competidores o personas con intereses contrarios, atacantes con motivación económica o causas no intencionadas como errores y desastres naturales. Entre los ejemplos vistos en clase aparecen malware, robo o sabotaje, usuarios muy expertos, fallos de red o sistema, falta de documentación, fallos de seguridad física, desastres naturales e incendios.

# 2.4 Valoración, probabilidad y tratamiento

La valoración de los activos puede hacerse a partir de la tríada **CIA**: confidencialidad, integridad y disponibilidad. Combinando esos tres valores se asigna criticidad al activo en una escala creciente. Al estudiar el impacto también hay que diferenciar entre **coste inmediato**, que es lo que la empresa debe afrontar en los días siguientes para volver a la normalidad, y **coste a largo plazo**, que suele reflejarse en pérdida de imagen, confianza o clientes. La severidad del impacto depende del valor del activo, de la severidad de la amenaza y de la gravedad de la vulnerabilidad.

La probabilidad de ocurrencia se estimaba en clase con una escala simple:

- `1`: nunca.
- `2`: raro, aproximadamente una vez al año.
- `3`: periódico, aproximadamente una vez por trimestre.
- `4`: regular, aproximadamente una vez cada 15 días.
- `5`: frecuente, aproximadamente una vez por semana.

Para estimar esa probabilidad hay que analizar los puntos débiles del sistema, las vías de acceso desde el exterior, la protección perimetral, los métodos de identificación de usuarios, el beneficio que obtendría un atacante y las estadísticas del país, del sector o del tipo de organización. La fórmula simplificada vista en clase es: `Riesgo = impacto o severidad x probabilidad de ocurrencia`.

Una vez valorado el riesgo, la organización puede **asumirlo**, **eliminarlo**, **mitigarlo** mediante controles o **transferirlo** mediante seguros u otras fórmulas. En la práctica, los riesgos aceptables pueden asumirse, los tolerables exigen decisión y seguimiento y los no aceptables deben tratarse. Mitigar solo tiene sentido si el coste de la protección es inferior a la pérdida esperada. Además, hay que tener en cuenta los requisitos legales aplicables, la posibilidad de asegurar ciertos riesgos y los riesgos residuales que acepte la dirección.

# 2.5 Dirección, plan director y repaso

Los resultados del análisis de riesgos y la arquitectura de seguridad propuesta deben quedar documentados. La dirección tiene un papel central: aprueba los riesgos residuales, autoriza la implantación del SGSI y expresa formalmente el compromiso de implantar acciones en un plazo determinado.

El **plan director de seguridad** ordena ese trabajo en varias fases: diagnóstico de la situación para conocer organización, procesos, activos y estado de seguridad; análisis de riesgos; verificación del grado de cumplimiento de normas como ISO 27001; plan de proyectos de seguridad a corto, medio y largo plazo; y gestión de riesgos para reducirlos, externalizarlos o asumirlos. Como metodología destacada aparece **MAGERIT v3**, referencia importante en la administración electrónica española.

Para examen conviene retener que la información es un activo esencial y debe protegerse durante todo su ciclo de vida; que un SGSI es un sistema formal, documentado y basado en riesgos; que la seguridad de la información no es solo técnica, sino también organizativa y directiva; que el análisis de riesgos parte de activos, amenazas, vulnerabilidades, impacto y probabilidad; que el tratamiento del riesgo puede consistir en asumir, eliminar, mitigar o transferir; y que la dirección tiene un papel clave en la aprobación, implantación y mejora del sistema.