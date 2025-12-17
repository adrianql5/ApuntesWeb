# 1. Responder razonadamente
### a) Explicar **GPUs Nvidia**, diciendo el tipo de Taxonomía y como aplican el paralelismo

### b) Explicar si con un con cachés con tamaño de tamaño de línea caché de 64 bytes, las siguientes direcciones de memoria estaban alineadas:
En hexadecimal estaban acabadas en algo como esto: 
- 0x.....40
- 0x.....80
- 0x.....20
- 0x.....00

### c) Explicar como afectan los valores de MaxIter y de N. Había que hablar de la localidad y la precarga de datos desde el punto de vista de la caché.
```c
for (int iter = 0; iter < MAX_ITER; iter++) {
    b[iter] = 0;

    for (int i = 0; i < N; i++) {
        x[i * 16] = (float)rand() / RAND_MAX;
        bi[i] = x[i * 16] + c[i];
    }
}
```

![[Pasted image 20250602161129.png]]

---

# 2. Teniendo en cuenta que todo lo relacionado con el salto se calcula en EX y que hay forwarding

```assembly
    add  $t0, $zero, $zero   # T0 = 0
    addi $t0, $t0, 32        # T0 = 32

    add  $t1, $zero, $zero   # T1 = 0

loop:
    beq  $t1, $t0, end       # while (T1 != T0)

    lw   $t2, 0($t1)         # T2 = MEM[T1]
    add  $t3, $t2, $t1       # T3 = T2 + T1
    sw   $t3, 0($t1)         # MEM[T1] = T3
    addi $t1, $t1, 4         # T1 += 4

    j    loop                # repeat loop

end:
```

### a) Diagrama de ejecución de la primera iteración

### b) Número de ciclos de todo el código

### c) Diagrama con el bucle desenrollado para 2 iteraciones

### d) Número de ciclos de todo el código desenrollado

---

# 3. Teniendo un MIPS de 5 etapas típico (no hay riesgos de datos)

### a)Con predicción **tomada**, explicar cuantos ciclos de pierden si falla y cuantos se pierden si acierta

### b) Con predicción **non tomada**, con:
- 25% `beq`  
- 10% `j`
    - 40% acierto
- Explicar:
    - Ganancia de CPI por predicción
    - CPI total



---

# 4. Ejercicio Típico MESI de 3 procesadores
### a) P0 lee `0x----14`

### b) P1 escribe `0x----15` con valor `0xalgo`

### c) P0 lee `0x----20`

