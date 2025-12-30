'use client';
import { Linkedin, Mail, Phone } from 'lucide-react';

export const Icons = {
    LinkedIn: ({ className }: { className?: string }) => (
        <Linkedin className={className} strokeWidth={1.5} />
    ),
    Email: ({ className }: { className?: string }) => (
        <Mail className={className} strokeWidth={1.5} />
    ),
    Phone: ({ className }: { className?: string }) => (
        <Phone className={className} strokeWidth={1.5} />
    )
};
