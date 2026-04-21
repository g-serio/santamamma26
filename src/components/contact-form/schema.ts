import { z } from 'zod';
import { BaseSectionData } from '@/lib/base-schemas';

export const ContactFormSchema = BaseSectionData.extend({
  label:          z.string().optional().describe('ui:text'),
  title:          z.string().describe('ui:text'),
  description:    z.string().optional().describe('ui:textarea'),
  addressLine1:   z.string().optional().describe('ui:text'),
  addressLine2:   z.string().optional().describe('ui:text'),
  phone:          z.string().optional().describe('ui:text'),
  email:          z.string().optional().describe('ui:text'),
  recipientEmail: z.string().email().optional().describe('ui:text'),
  actionUrl:      z.string().optional().describe('ui:text'),
  submitLabel:    z.string().optional().describe('ui:text'),
});

/**
 * Submission payload schema for `contact-form`.
 *
 * Describes the fields the rendered <form> in View.tsx actually submits.
 * Exposed via JsonPagesConfig.submissionSchemas so MCP agents can discover
 * the contract without scraping the DOM.
 *
 * Conventions (see ADR-0002 in @olonjs/core):
 * - Every field uses .describe() with a human-readable label the agent
 *   shows the user when asking for input.
 * - Calendar dates use ISO 8601 YYYY-MM-DD (z.string().regex(...)).
 * - `email_confirm` is intentionally omitted: it is a UX-only double-type
 *   check enforced by the View, not part of the data contract.
 * - `recipientEmail` is intentionally omitted: it is server-resolved from
 *   section.data.recipientEmail by the MCP gateway (see ADR-0001 in
 *   jsonpages-platform). Agents must not set it.
 */
export const ContactFormSubmissionSchema = z.object({
  name:     z.string().min(1).describe('Nome e cognome dell\'ospite'),
  email:    z.string().email().describe('Email di contatto dell\'ospite'),
  phone:    z.string().optional().describe('Telefono (opzionale)'),
  checkin:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Data di check-in (ISO 8601, YYYY-MM-DD)'),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Data di check-out (ISO 8601, YYYY-MM-DD)'),
  guests:   z.number().int().min(1).max(20).optional().describe('Numero di persone'),
  rooms:    z.number().int().min(1).max(10).optional().describe('Numero di stanze'),
  notes:    z.string().max(2000).optional().describe('Note, intolleranze, richieste speciali'),
});
