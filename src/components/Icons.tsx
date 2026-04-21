'use client';
import { FileText, Linkedin, Mail, Phone } from 'lucide-react';

export const Icons = {
  LinkedIn: ({ className }: { className?: string }) => (
    <Linkedin className={className} strokeWidth={1.5} />
  ),
  Resume: ({ className }: { className?: string }) => (
    <FileText className={className} strokeWidth={1.5} />
  ),
  Email: ({ className }: { className?: string }) => (
    <Mail className={className} strokeWidth={1.5} />
  ),
  Phone: ({ className }: { className?: string }) => (
    <Phone className={className} strokeWidth={1.5} />
  ),
};
