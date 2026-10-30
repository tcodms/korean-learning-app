import type { ButtonHTMLAttributes } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
export default function Action({ children, className='', ...props }:ButtonHTMLAttributes<HTMLButtonElement>){return <button type="button" className={`mal-action ${className}`} {...props}><span>{children}</span><ArrowRight size={20} weight="bold"/></button>;}
