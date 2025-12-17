Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

1. ¿A qué se refiere Tanenbaum cuando dice que no se pueden hacer suposiciones sobre el número de CPUs?

Tanembaum enuncia 4 condiciones para que una solución de exclusión mutua sea correcta. Entre ellas se encuentra la condición de no suponer velocidades ni numero de CPUs, esto quiere decir que la solución debe ser válida sin importar el número de CPUs del sistema.


2. ¿Puede haber regiones críticas de una sola instrucción máquina?
Existen regiones críticas de una sola instrucción máquina pues algunas instrucciones máquina no son atómicas. Por ejemplo, la instrucción STRD de ARMv7, que almacena el contenido de dos registros de 32 bits en memoria, no es atómica.  Realiza dos escrituras independientes, por lo que si entre ambas se realiza un cambio de contexto  otro hilo podría modificar la memoria compartida antes de que finalice la instrucción, provocando una condición de carrera. 


3. ¿Por qué no es correcto dormir un proceso (con sleep) para evitar carreras críticas?

Hay bastantes razones por las que no es correcto dormir un proceso con sleep para evitar carreras. Una de las razones es que el tiempo a bloquear el proceso o hilo es totalmente arbitrario y dependiendo del sistema, que el tiempo sea muy alto puede provocar la perdida de eficiencia, ya que habrá procesos que estén inactivos más tiempo de lo necesario, además, puede ocurrir que varios procesos se despierten a la vez para intentar entrar en la región crítica de manera simultánea, no solucionando el problema.


4. ¿Qué ocurriría si un proceso se bloquea indefinidamente en la región crítica? ¿Y si ejecuta un lazo infinito en ella? Puedes hacer un experimento.

Si un proceso se bloquea de manera indefinida en la región crítica, no finalizará su ejecución. Por tanto, cualquier otro proceso que esté esperando para entrar en la región nunca podrá avanzar.

Si lo que se ejecuta en la región crítica es un lazo infinito, la respuesta es la misma: la única diferencia es que el proceso puede ser planificado y ejecutarse en su quantum pero, como se trata de un lazo infinito, nunca acabará la ejecución de la región crítica y, en consecuencia, el resto de procesos que quieran entrar deberán esperar indefinidamente.

De cualquier forma, la respuesta a la pregunta puede depender de la manera en que se garantice la exclusión mutua. Por ejemplo, si la solución adoptada es deshabilitar interrupciones, como no se producen cambios de contexto, en el caso del lazo infinito, ese proceso coparía la CPU. Sin embargo, con las interrupciones deshabilitadas, un bloqueo es imposible (se necesita acceder al kernel), con lo cual, si el proceso intenta bloquearse, se generaría una inconsistencia en el sistema. 


5. Suponiendo un código ensamblador en el que se lee una variable compartida, se hace una operación que la modifica y se actualiza el nuevo valor en memoria, si es una región crítica ¿dónde empieza y dónde acaba?

La región crítica empieza en el momento en el que se lee el valor de la variable compartida, que corresponde a la instrucción de lectura y abarca hasta se guarda el nuevo valor en memoria. De esta forma la región crítica abarca las instrucciones comprendidas entre la instrucción de lectura y la de escritura, incluidas.


6. En un computador multinúcleo ¿existe una región crítica para cada núcleo o para todo el computador?

La región crítica es global para el computador, ya que protege el recurso compartido en todo el sistema (independientemente del número de núcleos). Así, si varios núcleos pueden acceder a un recurso común, la exclusión mutua debe garantizar que solo un núcleo pueda ejecutarse en esa sección crítica en cualquier momento, sin importar en qué núcleo se esté ejecutando.



7. ¿Cómo afecta el número de CPUs en la exclusión mutua?

A medida que aumenta el número de CPUs, mejora el rendimiento del sistema ya que esto permite la ejecución paralela de varios procesos. Como consecuencia, la complejidad de la exclusión mutua también aumenta el riesgo de condiciones de carrera. Para evitar obtener resultados erróneos, se emplean mecanismos como por ejemplo, los semáforos.


8. Si hay lecturas y escrituras a dos variables compartidas en zonas de código muy cercanas, ¿se debe establecer una única región crítica que englobe a todo el código o dos diferentes?

No se debe, cada región crítica esta vinculada a la variable compartida que la produce por lo que no pueden unirse regiones críticas de variables compartidas diferentes. Esto es así para evitar que se bloqueen procesos/hilos que están en regiones críticas de variables diferentes, pues no pueden producir una carrera crítica.


9. En la figura de la diapositiva 6, ¿no podría el proceso B realizar otras instrucciones que no afecten a la región crítica hasta que el proceso A salga  de esa región crítica?

Cuando el proceso B intenta entrar a la región crítica, observa que A ya se encuentra en ella y por tanto no lo consigue. En la imagen, se bloquea hasta que A sale de la región. Sin embargo, si se usan mutexes para regular el acceso a la región crítica, B podría intentar acceder a ella con un trylock, de manera que cuando se le deniegue el acceso pueda ejecutar otras tareas mientras espera a que A abandone la región crítica.


10. ¿Puede ocurrir un cambio de contexto cuando un proceso está ejecutando su región crítica?

Sí, puede ocurrir un cambio de contexto mientras un proceso está ejecutando su región crítica. Esto se debe a que el sistema operativo puede interrumpir un proceso en cualquier momento debido a la planificación del procesador, interrupciones de hardware o llamadas al sistema. Si un proceso es interrumpido en su región crítica y otro proceso accede a la misma sección de código, pueden producirse condiciones de carrera.

Para evitar estos problemas, se emplean mecanismos de sincronización, como semáforos y mutexes, que aseguran que solo un proceso pueda ejecutar la región crítica a la vez. También existen estrategias como la deshabilitación de interrupciones, aunque su uso es limitado en sistemas multiprocesador. Además, algunos sistemas utilizan operaciones atómicas para garantizar la coherencia sin necesidad de bloqueos explícitos.


11. Si una región crítica tiene 7 instrucciones, y la que está en la posición 4 es un syscall para realizar una operación de Entrada/Salida. ¿Se pueden tratar las líneas de la 1 a la 3 como una región crítica y las de la 5 a la 7 como otra?

No, si la syscall en posición 4 modifica los datos compartidos que son utilizados por las otras instrucciones de la región crítica. La syscall de E/S puede hacer que el SO programe un proceso distinto y si se tratan las líneas 1-3 y 5-7 como regiones críticas separadas, otro hilo podría acceder a la región crítica cuando se ejecuta la instrucción 4. En este caso, las instrucciones 5-7 estarían trabajando sobre un estado inconsistente. Si la syscall es completamente independiente a las demás instrucciones, sería posible.


12. ¿Qué particularidades tiene la exclusión mutua en una arquitectura multinúcleo diferentes de las de una con un solo núcleo?

Como en un sistema de único núcleo sólo se ejecuta un hilo a la vez, deshabilitar las interrupciones es un método válido (aunque poco atractivo) para lograr la exclusión mutua. En un sistema multinúcleo, al deshabilitar las interrupciones sólo se ve afectada la CPU que ejecutó la instrucción, y las demás podrán seguir accediendo a la memoria compartida y causar carreras críticas.
Además, en arquitecturas multinúcleo la exclusión mutua ofrece dificultades adicionales debido a que cada CPU tiene su propia caché.


13. ¿Es posible que la reorganización de instrucciones hecha por el compilador genere más (o amplíe) regiones críticas?

Sí, el compilador puede reordenar instrucciones para optimizar el rendimiento, y esto puede hacer que más instrucciones se incluyan en la región crítica. Para evitar esto se debe hacer un buen uso de las primitivas de sincronización y barreras de memoria.


14. Si se produce una excepción (por ejemplo una división por cero) en la ejecución de una región crítica. ¿Cómo afecta al resto de procesos? Puedes hacer una prueba.

Suponiendo que hablamos en el paradigma de la programación en C, sin try-catch u otras soluciones...
Cuando se produce una división por cero en un hilo, este será interrumpido. Además puede haber dejado la región crítica en un estado inconsistente.


15. ¿Qué motivo crees que puede haber para que los semáforos se llamen de esa forma?

Como dice la pregunta, es una cuestión poco técnica ya que el propio nombre nos lleva a asociar la palabra con los semáforos encargados de organizar el tráfico. Se llaman de esta forma debido a cómo es su funcionamiento:

    down: si el semáforo es mayor que 0 lo decrementa sin más, si es 0 se bloquea el proceso.
    up: incrementa el semáforo, si algún proceso estaba bloqueado por el semáforo se despierta para ejecutar su down.

Si el semáforo > 0, la contador decrementa, pero la ejecución es permitida. Esto lo podemos interpretar como el semáforo en verde, ya que permite el paso. Una vez el semáforo alcanza el valor cero, el proceso se bloquea, es decir, el semáforo se pone en rojo y no permite el paso del vehículo. De forma similar, cuando se ejecuta el "up", el proceso se despierta, por lo que entendemos que el semáforo vuelve a estar en verde.


16) ¿Qué pasa si dos aplicaciones hechas por diferentes desarrolladores crean semáforos con el mismo nombre para cosas diferentes y sus tiempos de ejecución se solapan? Puedes hacer el experimento y comentar los resultados.


Si dos aplicaciones diferentes crean semáforos con el mismo nombre pero los usan para propósitos distintos, pueden interferirse mutuamente, causando bloqueos inesperados o comportamiento incorrecto. Para probar esto, se proporcionan dos programas en archivos .c, al compilarlos y ejecutarlos podemos comprobrar lo siguiente:

Si app1 se ejecuta primero, inicializa el semáforo en 1. Cuando app2 intenta sem_wait(), funciona bien.

Si app2 se ejecuta primero, inicializa el semáforo en 0. Cuando app1 intenta sem_wait(), se bloquea indefinidamente porque nadie hace sem_post().

En general, el problema ocurre porque app2 asume que el semáforo inicia en 0, pero app1 lo espera en 1. Esto crea una condición de carrera y puede causar bloqueos inesperados.



17. En la solución del productor/consumidor con semáforos, la suma de los semáforos "full" y "empty" ¿qué valores puede tomar?

En la solución del productor/consumidor con semáforos usamos tres semáforos, uno para cada posible problema de comunicación entre procesos:

    mutex: asegura que el productor y el consumidor no tengan acceso al buffer al mismo tiempo. Se inicializa a 1.
    full: contabiliza el número de ranuras llenas del buffer. Se inicializa a 0, ya que al principio todas están vacías.
    empty: contabiliza el número de ranuras vacías del buffer. Se inicializa a N (el tamaño del buffer), ya que el buffer comienza vacío.

Los semáforos full y empty se usan para sincronizar el productor y el consumidor, asegurando que el productor deje de ejecutarse cuando el buffer está lleno y que el consumidor deja de ejecutarse cuando el buffer está vacío.

Dado que full contabiliza el número de posiciones llenas y empty el número de posiciones vacías, la suma debería ser el tamaño del buffer, N. Sin embargo, existen casos en los que esta suma puede dar un valor diferente temporalmente.

Para mantener la sincronización, cada proceso ejecuta primero un down de su semáforo correspondiente, y antes de ejecutar el up del otro semáforo, realiza la operación de modificación del buffer (usando el semáforo mutex). Si analizamos el valor de la variable después del down pero antes del up, veremos como se ha reducido en 1 la suma total, ya que el valor solo se actualiza una vez se haya insertado el elemento. En esos momentos valdrá N-1.

Además, tenemos otro caso en el que la suma puede no valer N. Si justo después de ejecutar el down de uno de los procesos se produce un cambio de contexto, y la CPU se le entrega al otro proceso, este segundo puede ejecutar su propio down, haciendo que la suma valga N-2 hasta que se ejecute alguno de los ups.

No sería posible en ningún caso que la suma fuese menor que N-2, ya que como solo interviene un consumidor y un productor, solo pueden coincidir 2 downs sin sus correspondientes ups a la vez.


18. ¿La respuesta a la anterior cuestión cambia  si hay P>1 productores y C>1 consumidores?

No, la respuesta ya no es la misma ya que ahora hay un mayor número de procesos que pueden realizar operaciones sobre los semáforos. Se sigue cumpliendo que, en la mayor parte de los casos, la suma de posiciones vacías y llenas del buffer debe seguir correspondiendo al número de posiciones totales del buffer, N.

Sin embargo, igual que el el caso anterior puede suceder que uno de los procesos ejecute su down y se produzca un cambio de contexto que otorgue la CPU a otro de los procesos. Así, en el peor de los casos puede suceder que todos los procesos, tanto productores como consumidores, ejecuten su down y se les expropie la CPU, hasta llegar al caso en el que todos ellos se han ejecutado solamente hasta su down y, por lo tanto, la suma podría llegar a valer N-(P+C).

En cualquier momento, la suma puede tomar valores entre N y N-(P+C). Para el caso de un productor y un consumidor, se cumple también que la suma toma valores entre N y N-(1+1) = N-2.


19. ¿Qué implicaciones tendría intercambiar el orden de los dos down en el código del productor con semáforos?
El código del productor con semáforos ejecuta primero down(&vacias) y después down(&mutex), es decir, primero comprueba que haya ranuras vacías disponibles en el búfer, en el caso de haberlas, disminuye la cuenta y en el caso de que no, pone a dormir al proceso sin completar la operación down hasta que otro proceso haga un up(), para después comprobar si puede entrar en la región crítica; en caso de que esta esté ocupada, el proceso se duerme hasta que el proceso que está en el momento ocupando la región crítica la libere; por el contrario, si ya está libre, entra en la región crítica y pone el semáforo mutex en 0, indicando que está ocupada.
Si intercambiáramos el orden de ambas operaciones, el proceso entraría primero en la región crítica en cuanto se le permitiese, y después realizaría la comprobación de si hay o no ranuras vacías; en caso de haberlas, podría proceder añadiendo un nuevo elemento y disminuyendo la cuenta, pero, en caso de no haber, el proceso se quedaría dormido a la espera de que otro realice un up(), ocupando la región crítica e impidiendo que el proceso consumidor entre a ella y libere espacio, produciendo un deadlock.

20. ¿Qué implicaciones tendría intercambiar el orden de los dos up en el código del productor con semáforos?
El código del productor con semáforos ejecuta primero up(&mutex) y después up(&llenas), es decir, primero sale de la región crítica tras insertar un elemento en el búfer y después incrementa el número de ranuras llenas y, en caso de que haya algún consumidor que se haya dormido porque el búfer estaba vacío, despierta a uno de estos al azar (en el caso de que haya varios consumidores), permitiendo que continúe con su ejecución.
Si intercambiáramos el orden de ambas operaciones, el proceso incrementaría primero el número de ranuras llenas y, en caso de haberlo, despertaría a un consumidor al azar, para después liberar la región crítica. Esto podría llevar a que, como el consumidor se despierta antes de que el productor libere la región crítica, este podría leer un elemento que el productor todavía no ha terminado de modificar, lo que podría generar inconsistencias en datos y comportamientos inesperados. Además de esto, cuando el consumidor intente hacer down(&mutex), se quedará bloqueado, ya que el productor todavía no habría liberado la región crítica, lo que afecta al rendimiento del sistema ya que se introducen esperas innecesarias.


