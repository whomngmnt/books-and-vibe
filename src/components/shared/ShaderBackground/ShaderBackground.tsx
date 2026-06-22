import { useEffect, useRef } from 'react';
import styles from './ShaderBackground.module.scss';

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl');

    if (!gl) return;

    const vertexShader = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;

      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float u_time;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform vec3 u_colorC;

      varying vec2 v_texCoord;

      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      float snoise(vec2 v) {
        const vec4 C = vec4(
          0.211324865405187,
          0.366025403784439,
          -0.577350269189626,
          0.024390243902439
        );

        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);

        vec2 i1 = x0.x > x0.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;

        i = mod(i, 289.0);

        vec3 p = permute(
          permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0)
        );

        vec3 m = max(
          0.5 - vec3(
            dot(x0, x0),
            dot(x12.xy, x12.xy),
            dot(x12.zw, x12.zw)
          ),
          0.0
        );

        m = m * m;
        m = m * m;

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;

        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;

        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;

        float n = snoise(uv * 3.0 + u_time * 0.1);
        n += 0.5 * snoise(uv * 6.0 - u_time * 0.15);

        vec3 color = mix(u_colorA, u_colorB, smoothstep(-0.5, 0.5, n));
        color = mix(color, u_colorC, smoothstep(0.35, 0.9, n) * 0.28);

        float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.03;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);

      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      return shader;
    };

    const vertex = createShader(gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertex || !fragment) return;

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, 'a_position');

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uColorA = gl.getUniformLocation(program, 'u_colorA');
    const uColorB = gl.getUniformLocation(program, 'u_colorB');
    const uColorC = gl.getUniformLocation(program, 'u_colorC');

    const isDarkTheme = document.body.dataset.theme === 'dark';

    const colors =
      isDarkTheme ?
        {
          a: [0.078, 0.267, 0.282], // #144448 aqua-hover
          b: [0.741, 0.424, 0.357],
          c: [0.88, 0.85, 0.81], // cream
        }
      : {
          a: [0.961, 0.941, 0.91], // cream
          b: [0.898, 0.561, 0.475], // neon clay
          c: [0.259, 0.208, 0.176], // coffee
        };

    if (uColorA && uColorB && uColorC) {
      gl.uniform3fv(uColorA, colors.a);
      gl.uniform3fv(uColorB, colors.b);
      gl.uniform3fv(uColorC, colors.c);
    }

    let animationId = 0;

    const render = (time: number) => {
      syncSize();

      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) {
        gl.uniform1f(uTime, time * 0.001);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.shaderCanvas}
    />
  );
};
