import React, { useEffect, useRef, useState } from 'react';

interface SimpleCaptchaProps {
  length?: number;
  height?: number;
  width?: number;
  backgroundColor?: string;
  textColor?: string;
  onGenerate?: (code: string) => void;
}

// 生成随机字符
const generateRandomChar = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

// 生成随机验证码
const generateCaptchaText = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += generateRandomChar();
  }
  return result;
};

// 绘制验证码到Canvas
const drawCaptcha = (
  canvas: HTMLCanvasElement,
  text: string,
  backgroundColor: string,
  textColor: string
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 设置背景
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
    ctx.fill();
  }

  // 设置文本样式
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = textColor;
  ctx.font = '24px Arial';

  // 绘制文本，每个字符稍微旋转一下
  const charWidth = canvas.width / text.length;
  for (let i = 0; i < text.length; i++) {
    ctx.save();
    ctx.translate(charWidth * i + charWidth / 2, canvas.height / 2);
    ctx.rotate((Math.random() - 0.5) * 0.3);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
};

export const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({
  length = 6,
  height = 40,
  width = 150,
  backgroundColor = '#f0f0f0',
  textColor = '#333',
  onGenerate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState<string>('');

  // 刷新验证码
  const refreshCaptcha = () => {
    const newCaptchaText = generateCaptchaText(length);
    setCaptchaText(newCaptchaText);
    if (onGenerate) {
      onGenerate(newCaptchaText);
    }
  };

  // 初始化和刷新验证码时重绘
  useEffect(() => {
    if (canvasRef.current && captchaText) {
      drawCaptcha(canvasRef.current, captchaText, backgroundColor, textColor);
    }
  }, [captchaText, backgroundColor, textColor]);

  // 组件挂载时生成验证码
  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="flex items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-pointer rounded border border-gray-300"
        onClick={refreshCaptcha}
        title="点击刷新验证码"
      />

    </div>
  );
};

// 验证函数
export const validateSimpleCaptcha = (userInput: string, captchaText: string): boolean => {
  return userInput.toLowerCase() === captchaText.toLowerCase();
};