<template>
  <div class="container my-5">
    <div class="row">
      <!-- Contenedor del video -->
      <div class="col" style="height: 315">
        <!-- Agrega un :key dinámico al iframe -->
        <div :key="currentVideoIndex">
          <iframe
            width="100%"
            height="500"
            :src="videoUrl"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <!-- Columna para la descripción y el botón -->
      <div class="col-lg-4 mt-3 mt-lg-0">
        <div class="row">
          <div class="col">
            <!-- Alerta y cuadro de texto -->
            <div class="alert fs-5" role="alert">
              Observa el video a continuación y describe de manera sencilla en
              el campo de texto las instrucciones que indicarías para que el
              robot pueda llevar a cabo dicha acción
            </div>
            <textarea
              v-model="descripcion"
              placeholder="Descripción del video"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="8"
              style="resize: none"
            ></textarea>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <!-- Botón para enviar -->
            <button
              @click="enviarVideo"
              :disabled="!descripcion.trim()"
              class="btn btn-primary w-100"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  
  data() {
    return {
      matricule: this.$route.query.matricula,
      videos: [
        "8LcQa0EZdGA?si=3EzUfCeFrxkWU3UB",
        "GVM0wis_s4k?si=QW163N3gRQhW3jMJ",
        "ozLj0fAHUrQ?si=EKCigZ8gaYwX9097",
        "0bW356bMBLk?si=g2xdzMI39DKlwsPt",
        "0msVUCTPIbM?si=FwqxSbSTMfXVZZ_h",
        "AKHcLYFjCGo?si=eldYpEyEPndXnVh9",
        "8LcQa0EZdGA?si=3EzUfCeFrxkWU3UB",
      ],
      currentVideoIndex: 0, 
      descripcion: "",
    };
  },
  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${
        this.videos[this.currentVideoIndex]
      }?t=${Date.now()}`;
    },
  },
  methods: {
    
    cambiarSiguienteVideo() {
      this.currentVideoIndex =
        (this.currentVideoIndex + 1) % this.videos.length;
    },

    async enviarVideo() {
      // Verificar si la descripción está presente antes de enviar
      if (this.descripcion.trim()) {
        try {
          console.log(
            "Mensaje enviado: ",
            this.matricule,
            this.videos[this.currentVideoIndex],
            this.descripcion
          );
          const response = await axios.post(
            "https://backrobotcbr.onrender.com/crear-video-response/",
            {
              matricule: this.matricule,
              video_name: this.videos[this.currentVideoIndex],
              response: this.descripcion,
            }
          );

          //console.log("Respuesta del servidor:", response);

          // Verificar la respuesta del servidor (puedes ajustar esto según la respuesta esperada)
          if (response.status === 200) {
            console.log("Datos enviados con éxito al servidor:", response.data);
          } else {
            console.error(
              "Error en la respuesta del servidor:",
              response.statusText
            );
          }

          // Lógica para cambiar al siguiente video
          this.cambiarSiguienteVideo();

          // Limpiar la descripción después de enviar
          this.descripcion = "";
          // Verificar si todos los videos han sido vistos
          if (this.currentVideoIndex === this.videos.length - 1) {
            // Mostrar mensaje de alerta
            alert("¡Has visto todos los videos! Gracias por participar.");

            // Recargar la página
            this.$router.push({ path: '/' });
          }
        } catch (error) {
          console.error("Error al enviar datos al servidor:", error);
        }
      } else {
        // Manejar el caso en el que la descripción está vacía
        console.warn("La descripción no puede estar vacía");
      }
    },
  },
};
</script>

