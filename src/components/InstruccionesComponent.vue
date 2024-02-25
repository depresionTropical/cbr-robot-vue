<!-- Instrucciones.vue -->
<template>
  <div class="container my-5">
    <h1 class="display-4 text-center fw-bold">Instrucciones</h1>
    <form @submit.prevent="irAVideos" class="mt-4">
      <div class="row">
        <div class="alert fs-5 col-md-10 mx-auto mb-3" role="alert">
          <p>
            Observa los 6 videos a continuación. Describe de que manera le
            dirías al robot que realice la acción que se muestra en el video.
          </p>
          <p>
            Al presionar el botón "Enviar", pasarás automáticamente al siguiente
            video.
          </p>

          <p>Aquí tienes algunos consejos para tu descripción:</p>
          <ul>
            <li>Describe cada paso de manera clara y concisa.</li>
            <li>
              Utiliza un lenguaje sencillo para que las instrucciones sean
              comprensibles.
            </li>
            <li>Enfócate en acciones específicas que el robot realiza.</li>
            <li>
              Considera la orientación del robot: hay dos imágenes a
              continuación, una vista desde enfrente y otra desde una vista
              aérea.
            </li>
          </ul>

          <p>Imágenes de referencia:</p>
          <div class="row">
            <div class="col-md-5 col-md-4 mx-auto mb-3">
              <img
                src="../assets/face_photo.png"
                class="img-fluid"
                alt="Foto de Face (Vista Frontal)"
              />
            </div>
            <div class="col-md-5 col-md-4 mx-auto mb-5">
              <img
                src="../assets/look_up_photo.png"
                class="img-fluid"
                alt="Foto de Look Up (Vista Aérea)"
              />
            </div>
          </div>

          <p>
            Tu descripción debe considerar la orientación del robot según estas
            imágenes.
          </p>

          <p>
            Recuerda que puedes reproducir los videos cuantas veces quieras,
            pero la instrucción se considera como si se la hubieras dado una
            vez.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="fs-5 col-md-6 mx-auto mb-3">
          <!-- Matrícula -->
          <label for="matricula" class="form-label"
            >Ingresa tu matrícula:
          </label>
          <input
            v-model="matricula"
            type="text"
            class="form-control"
            id="matricula"
            placeholder="E24080710"
            required
            pattern="E\d{2}08\d{4}"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary mx-auto d-block">
        Ir a Videos
      </button>
    </form>
  </div>
</template>



<script>
export default {
  data() {
    return {
      matricula: "",
    };
  },
  methods: {
    irAVideos() {
      this.$router.push({
        path: "/videos",
        query: { matricula: this.matricula },
      });
    },
  },
};
</script>
