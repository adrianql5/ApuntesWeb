---
title: "Foros2"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

1. Reescribe el código ensamblador de la figura 2.29 del Tanenbaum usando XCHG en lugar de TSP como instrucción atómica. 

Se reemplaza la instrucción TSL REGISTRO,MUTEX por dos instrucciones separadas. Primero se guarda 1 en un registro y luego se llama a XCHG para intercambiar el contenido del registro con el del mutex. El resultado es el mismo que usando TSL: se escribe 1 en el mutex y se guarda en el registro el valor previo del mutex. El resto del código es igual.

```
mutex_lock:
        MOVE REGISTRO,#1
        XCHG REGISTRO,MUTEX
        CMP REGISTRO,#0
        JZE ok
        CALL thread_yield
        JMP mutex_lock
ok:  RET

mutex_unlock:
        MOVE MUTEX,#0
        RET
``` 



2. Hemos visto en clase que la función pthread_cond_signal desbloquea a un proceso que ha ejecutado un pthread_cond_wait previamente. Sin embargo, si no hay ningún proceso bloqueado, ese aviso de desbloqueo se pierde. Razona si esto puede tener algún problema en el código visto en clase (figura 2.32 del Tanenbaum). 

No afecta al código de la figura 2.32, ya que si no hay ningún proceso bloqueado significa que productor y consumidor están trabajando y funcionando (hay espacio para seguir produciendo, hay ítems por seguir consumiendo), por lo que la pérdida de este aviso no supondrá ningún problema.  


3. Lee el manual de las funciones pthread_cond_signal y pthread_cond_broadcast. ¿Se te ocurre alguna situación en la que el uso de la primera sea claramente preferible al de la segunda?

El uso del pthread_cond_broadcast es el mejor en su caso debido a que se deben despertar a todos los hilos que estaban esperando en la barrera. Sin embaargo, en una situación como un problema productor-consumidor clásico, esto no sería eficiente, ya que se despertarían todos los hilos para realizar una única tarea, y todos estos hilos se "pelearían" por ella, hasta ver que la condición para la mayoria (todos menos uno) no se cumple, ya que la tarea debe ser realizada por un solo hilo. Esto, a pesar de no ser un problema grave de funcionamiento, empeora el rendimiento general del programa. 

Tomando como ejemplo el código de la respuesta 4, de Ismael Rodriguez, si en vez de querer que todos los hilos "saluden" cuando se cumple la condición de superar la barrera, se quiere que cuando todos lleguen a ese punto, uno y solo uno de ellos desapile una cola, el uso preferible será el de pthread_cond_broadcast


4. Lee el manual de las funciones pthread_cond_signal y pthread_cond_broadcast. ¿Se te ocurre alguna situación en la que el uso de la segunda sea claramente preferible al de la primera?

Por ejemplo, es preferible el uso de pthread_cond_broadcast en una implementación para la gestión de una barrera de sincronización entre hilos. Utilizando dicha función se despertarán todos los hilos que estaban dormidos por la misma variable de condición:
```
#define T 8 //Número de hilos

int hilosEnLaBarrera = 0;
pthread_cond_t barreraCond;
pthread_mutex_t barreraMutex;

void* saludar(void *args){
    int id = *((int*)args);

    sleep(id); //Los hilos entran cada segundo a la barrera en orden según su id

    // Barrera de sincronización
    pthread_mutex_lock(&barreraMutex);
    
    printf("Hilo %d entrando en la barrera\n", id);
    hilosEnLaBarrera++;

    while(hilosEnLaBarrera < T) pthread_cond_wait(&barreraCond, &barreraMutex);
    pthread_mutex_unlock(&barreraMutex);
    pthread_cond_broadcast(&barreraCond);
    // Fin de la barrera

    printf("Hola desde el hilo %d\n", id);
    pthread_exit(NULL);
}
```

En el código anterior los hilos se quedarán boqueados hasta que todos los hilos hayan llegado a la barrera y una vez que esto pase el último despierta a todos los hilos dormidos. La razón de utilizar pthread_mutex_unlock del mutex de la barrera es imprescindible, ya que para salir del bloqueo causado por pthread_cond_wait los hilos necesitan obtener de nuevo el mutex de la barrera, si el último hilos no liberara dicho mútex los demás hilos se quedarían permanentemente bloqueados.

En esta implementación nos interesa utilizar la función pthread_cond_broadcast frente a la función pthread_cond_signal, ya que esta despierta a todos los hilos que están esperando, y no solo un hilo de los que están esperando como es el caso de pthread_cond_signal.

5. En los códigos del productor y consumidor de la figura 2.32 del Tanenbaum, ¿qué implicaciones tiene que se use while en lugar de if?

Cuando el productor o el consumidor se encuentran esperando en una variable de condición debido a que el búfer está lleno o vacío, respectivamente, al ser "despertados" deberán volver a competir por el mutex. Entonces, cuando lo adquieran, la condición que provocó su desbloqueo podría haber dejado de cumplirse. Por esto es necesario verificar otra vez dicha condición antes de continuar.
Si se usase un if, la condición se comprobaría únicamente antes de quedar bloqueado, por lo que podrían continuar aunque la condición que los "despertó" dejase de ser cierta, lo cual llevaría a errores.
Al usar un while, comprobarán la condición después de cada "despertar" y, si esta aún no se cumple, volverán a bloquearse.


6. ¿Como implementar un mutex_lock y mutex_unlock con up y down?

Como el mutex_lock y el mutex_unlock en código ensamblador vistos en clase interpreta el mutex a 0 como desbloqueado y mutex a 1 como bloqueado, para poder implementarlos con up y down, teniendo en cuenta que para bloquear a un proceso o hilo con down, se necesita un 0 en el semáforo mutex, necesitaríamos simplemente que se invierta la lógica, es decir, que el mutex debe estar a 1 para estar desbloqueado y a 0 para estar bloqueado. De esta manera, simplemente al llamar a mutex_lock, se ejecutará un down del semáforo (inicialmente a 1), y si el semáforo valía 1, lo decrementa y entra a la región crítica, en caso contrario, se autobloquea. Cuando se llame a mutex_unlock (al salir de la región crítica), se ejecutará un up al semáforo, incrementándolo, y si hay algún otro proceso que se quedó bloqueado al intentar hacer su down, se despertará para completarlo.

Hay que tener en cuenta, que en el mutex_lock, si no se puede entrar a la región crítica, se hace una pequeña espera activa, pero que se amortigua al ejecutar pthread_yield, para entregarle la CPU a otro hilo, este comportamiento no se espera del down.


7. ¿Como implementar un up y down con mutex_lock y mutex_unlock?

```
typedef struct{
  int valor;
  pthread_mutex_t mutex;
  pthread_cond_t cond;
}Semaforo;


void init_sem(Semaforo *s){
  s->valor=0;
  pthread_mutex_init(&s->mutex,NULL);
  pthread_cond_init(&s->cond,NULL);
}

void sem_up(Semaforo *s){
  pthread_mutex_lock(&s->mutex);
  s->valor++;
  pthread_cond_signal(&s->cond);
  pthread_mutex_unlock(&s->mutex);
}

void sem_down(Semaforo *s){
  pthread_mutex_lock(&s->mutex);
  while(s->valor==0)
    pthread_cond_wait(&s->cond, &s->mutex);
  s->valor--;
  pthread_mutex_unlock(&s->mutex);
}
```



8. ¿Si no hay memoria compartida, tienen sentido las carreras críticas en un sistema distribuido?

Las carreras críticas son ejecuciones erróneas de un programa por culpa de un cambio de contexto o una interrupción de reloj durante un momento crítico de la ejecución. Se dan condiciones de carrera cuando dos o más procesos están leyendo o escribiendo algunos datos compartidos y el resultado final depende de quién ejecuta y exactamente de cuándo lo hace. En los sistemas distribuidos, pese a no contar con una memoria compartida, estas condiciones se dan cuando dos o más procesos acceden de forma concurrente a recursos compartidos lógicamente, tales como archivos, bases de datos...
Por lo tanto, aunque la memoria no sea compartida físicamente, la necesidad de sincronización sigue existiendo para que no se den lugar condiciones de carrera. El paso de mensajes es la única opción para implementar esa sincronización en este tipo de sistemas, ya que es la única forma de comunicación entre procesos.



9. En el código de Tanenbaum con la solución con pase de mensajes, ¿m juega el papel del buffer del problema del productor-consumidor?

Aunque puede dar lugar a confusiones, realmente no, m no es el buffer que vemos en otras iteraciones del problema del productor-consumidor, en el código expuesto en el Tanenbaum, se dice que es el "buffer de mensajes" con un comentario a su derecha, sin embargo el uso que se le da contradice este comentario ya que se utiliza de forma más similar a la variable item o elemento en las iteraciones del problema anteriores(por ejemplo mandándolo N veces desde el consumidor como mensaje vacío para indicar el tamaño del buffer, por lo que si m fuese el buffer estaría mandando N veces el supuesto tamaño N del buffer), este comportamiento se debe a que realmente m representa la "copia de un elemento" en el buffer de envío o recepción cuya gestión es dejada en manos del sistema operativo del productor o del consumidor, normalmente por la librería que utilicemos. 

En conclusión m representa un elemento concreto en un instante dado y no juega el mismo papel que el buffer que teníamos en las versiones anteriores.



10. La solución de Tanenbaum con pase de mensajes ¿sirve para más de un productor y más de un consumidor?

Tal y como Tanenbaum describe su solución al problema del productor-consumidor con pase de mensajes, esta sirve solamente para un productor y un consumidor. Para empezar las primitivas send(dest, &m) y receive(origen, &m) se emplean entre dos procesos, sin poder distinguir de forma inherente  a qué proceso pertenece cada mensaje vacío ni de serializar las recepciones. Además, se podrían producir condiciones de carrera, ya que no se gestiona la sincronización entre procesos.

Para poder emplear concurrentemente varios productores y varios consumidores habría que modificar el código, empleando semáforos, mutex o monitores que garantizan la exclusión mutua.



11. ¿Como programar el acceso a una región crítica con pase de mensajes?

Para poder utilizar el pase de mensajes para crear una zona de exclusión entre los procesos, podemos establecer una cola de mensajes de tamaño 1, por la que se manda un mensaje de permiso, que una vez recibido le da acceso a la región crítica al hilo, después ese hilo para poder liberar el acceso simplemente debe hacer un send del permiso, no es la variable que se envía, si no el hecho de que los demás hilos se quedarán esperando con la función recieve, mediante la cual se pelearán por adquirir el mensaje, lo que resulta en un efecto similar al del mutex. 

Gracias a esto, con este simple código podemos comprobar que no ocurren carreras críticas:

```
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <mqueue.h>
#include <unistd.h>

#define N 8
#define ITERACIONES 10000

mqd_t almacen;
int resultado = 0;

void *exclusionSendRecieve() {
    char permiso;
    int i = 0;
    //BUcle simple en el que los hilos suman sobre una variable 
    while (i < ITERACIONES) {
        // Solicitar acceso a la sección crítica
        mq_receive(almacen, &permiso, sizeof(char), NULL);
        // Sección crítica
        resultado++;
        // Devolver el permiso
        mq_send(almacen, &permiso, sizeof(char), 0);

        i++;
    }
    return NULL;
}

int main() {
    pthread_t hilos[N];
    struct mq_attr attr;
    char permiso = 'P';
    // Configuración de la cola de mensajes
    attr.mq_maxmsg = 1;  // Solo necesitamos un permiso
    attr.mq_msgsize = sizeof(char);

    mq_unlink("/ALMACEN");  // Asegurarse de que no exista previamente
    //Inicializamos la cola de mensajes
    almacen = mq_open("/ALMACEN", O_CREAT | O_RDWR, 0666, &attr);
    if (almacen == (mqd_t)-1) {
        perror("Error al abrir la cola de mensajes");
        exit(EXIT_FAILURE);
    }
    // Enviar el "permiso" inicial
    mq_send(almacen, &permiso, sizeof(char), 0);
    // Crear hilos
    for (int i = 0; i < N; i++) {
        pthread_create(&hilos[i], NULL, exclusionSendRecieve, (void *)0);
    }
    // Esperar a que todos los hilos terminen
    for (int i = 0; i < N; i++) {
        pthread_join(hilos[i], NULL);
    }
    printf("Valor resultante: %d\n", resultado);
    // Limpiar recursos
    mq_close(almacen);
    mq_unlink("/ALMACEN");
    return 0;
}
```



12. ¿Como programar una barrera de sincronización con semáforos?

Explicación del Código de Barrera con Semáforos

Una barrera de sincronización es un mecanismo que asegura que un conjunto de hilos espere hasta que todos hayan alcanzado un punto específico antes de continuar. Luego implementarlo a base de semáforos resultado sencillo de la siguiente forma:

Primero defino la siguiente estructura de barrera, para facilitarme el paso de parámetros conjuntos.


    -mutex: Semáforo binario que protege el acceso al contador `count`.
    - barrier: Semáforo que bloquea a los hilos hasta que se alcance el número requerido.
    - count: Contador que registra el número de hilos que han llegado a la barrera.
    - num_threads: Número total de hilos necesarios para liberar la barrera.

Los cuales inicializo de la siguiente forma:


El semáforo `mutex` se inicializa en 1 (libre) y `barrier` se inicializa en 0 (bloqueado).

Después simplemente queda simular el comportamiento clave de la espera:


A resumidas cuentas los pasos son:

    El hilo entra en la región crítica protegida por `mutex` e incrementa el contador `count`.
     Si el hilo es el último en llegar a la barrera:
        - Libera el semáforo `barrier` un total de `num_threads - 1` veces para despertar a los demás hilos.
        - Reinicia el contador `count` para permitir la reutilización de la barrera.
    Si el hilo no es el último, se bloquea en el semáforo `barrier` hasta que sea liberado.

Luego simplemente habría que llamar al barrier_wait en la función de cada hilo en el momento preciso, y funcionaría como una barrera normal.

```
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h> 

typedef struct {
    sem_t mutex;
    sem_t barrier;
    int count;
    int num_threads;
} Barrier;

void barrier_init(Barrier *b, int num_threads) {
    sem_init(&b->mutex, 0, 1);
    sem_init(&b->barrier, 0, 0);
    b->count = 0;
    b->num_threads = num_threads;
}

void barrier_wait(Barrier *b) {
    sem_wait(&b->mutex);
    b->count++;
    if (b->count == b->num_threads) {
        for (int i = 0; i < b->num_threads - 1; i++) {
            sem_post(&b->barrier);
        }
        b->count = 0;
        sem_post(&b->mutex);
    } else {
        sem_post(&b->mutex);
        sem_wait(&b->barrier);
    }
}

// Función de ejemplo para los hilos
void* thread_func(void *arg) {
    Barrier *barrier = (Barrier*)arg;
    printf("Hilo %lu: Inicia trabajo previo\n", pthread_self());
    sleep(1); // Simula trabajo
    printf("Hilo %lu: Llegó a la barrera\n", pthread_self());
    barrier_wait(barrier); // Espera aquí
    printf("Hilo %lu: Continúa después de la barrera\n", pthread_self());
    return NULL;
}

int main() {
    const int NUM_THREADS = 4;
    pthread_t threads[NUM_THREADS];
    Barrier barrier;

    barrier_init(&barrier, NUM_THREADS);

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, thread_func, &barrier);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    sem_destroy(&barrier.mutex);
    sem_destroy(&barrier.barrier);

    return 0;
}
```

13. ¿Como programar una barrera de sincronización con mutexes y variables de condición?

Eu creei a miña barreira da seguinte maneira : 
```
void wait_barrier() {
    pthread_mutex_lock(mutex);
    contador++;
    if (contador < num_fios) {
        pthread_cond_wait(cond, mutex);
    } else {
        pthread_cond_broadcast(cond);
    }
    pthread_mutex_unlock(mutex);
}
```

Onde contador é o nº de fíos que están xa esperando na barreira e num_fios, como o propio nome indica, o número de fíos necesarios para que esa barreira desapareza.

Cada vez que se chama a wait_barrier() bloqueamos o acceso á función para poder incrementar o contador sen provocar incoherencias por culpa das carreiras críticas, despois comprobamos se dito contador é menor ca o número de fíos, se se cumpre fai un pthread_cond_wait().

Cando o último fío chama á función wait_barrier(),  (como agora é contador > num_fios) realiza un pthread_cond_broadcast() que avisa a todos os fíos que estaban esperando.



14. ¿Como programar una barrera de sincronización con funciones send y receive de pase de mensajes?
```
int count = 0;
int total_threads;  // Debes inicializarlo con el número de hilos
pthread_mutex_t mutex;
pthread_cond_t cond;

pthread_mutex_init(&mutex, 0);
pthread_cond_init(&cond, 0);

void barrier() {
    pthread_mutex_lock(&mutex);

    count++;

    if (count < total_threads) {
        // Aún no han llegado todos, el hilo espera
        pthread_cond_wait(&cond, &mutex);
    } else {
        // Último hilo en llegar, despierta a todos
        count = 0;  // Reinicia para una posible reutilización de la barrera
        pthread_cond_broadcast(&cond);
    }

    pthread_mutex_unlock(&mutex);
}
```

Cada hilo entra a la función barrier() y bloquea el mutex.

Aumenta el contador count al llegar.

Si no es el último hilo en llegar, hace wait() y se duerme (espera que lo despierten).

Si es el último, hace broadcast() para despertar a todos los hilos esperando.

Se libera el mutex y todos continúan.

