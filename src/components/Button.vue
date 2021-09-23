<template>
  <div
    class="button"
    :style="style"
    @click="onClick"
  >
    <div :class="`button-background ${loading ? 'button-glow': ''}`" :style="_backgroundStyle" />
    <div v-if="icon" class="button-icon" v-html="svg" />
    <span :class="`button-text non-breaking-text ${icon ? 'text-with-icon' : ''}`">{{ text }}</span>
  </div>
</template>

<style scoped>
.button {
  background-color: var(--border-color);
  position: relative;
  height: 3rem;
  border-radius: 0.3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  overflow: hidden;
  transition: all 150ms linear;

  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.2);
}

@media (hover: hover) {
  .button:hover {
    cursor: pointer;
    opacity: 0.85;
    box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.3);
  }
}

.button-icon {
  position: absolute;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

.button-text {
  position: relative;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  pointer-events: none;
}

.text-with-icon {
  padding-left: 1.5rem;
}

.button-background {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.1s linear, background-color 0.1s linear;
  transform-origin: center left;
  transform: scaleX(1.0);
}

.button-glow {
  animation-name: glow;
  animation-duration: 500ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes glow {
  from { opacity: 0.1 }
  to   { opacity: 1 }
}
</style>

<script lang="ts">
import { clamp } from '@/lib/util'

export default {
  props: {
    icon: {
      type: String,
      default: null,
      required: false
    },
    text: {
      type: String,
      default: null,
      required: false
    },
    color: {
      type: String,
      default: 'var(--primary-color)',
      required: false
    },
    textColor: {
      type: String,
      default: '#000',
      required: false
    },
    block: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    progress: {
      type: Number,
      default: 1.0,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    _progress(): number { return clamp(this.progress, 0, 1); },

    style(): String {
      return `${this.disabled ? 'pointer-events: none;' : ''}` +
             `${this.block ? 'display: flex;' : ''}` +
             `color: ${this.disabled ? 'var(--muted-text-color)' : this.textColor}`;
    },

    _backgroundStyle(): String {
      return `transform: scaleX(${this._progress});` +
      `background-color: ${this.disabled ? 'var(--border-color)' : this.color};`;
    },

    svg(): String | null { return this.icon ? require(`@/assets/icons/${this.icon}.svg`) : null; }
  },
  methods: {
    onClick(event: Event) {
      if (!this.disabled) {
        this.doRipple(event);
        this.$emit('click');
      }
    },

    doRipple(event: Event) {
      const parent = event.currentTarget as HTMLElement;
      if (parent) {
        const ripple = document.createElement('div');
        ripple.style.width = ripple.style.height = '100%';
        ripple.style.top = ripple.style.left = '0';
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        ripple.classList.add('ripple');
        parent.appendChild(ripple);
      }
    }
  }
};
</script>
