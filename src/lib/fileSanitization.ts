/**
 * Sanitizes a file name to prevent security issues including:
 * - Directory traversal attacks
 * - Double extension attacks
 * - Dangerous characters
 * - Hidden files
 * - Overly long filenames
 *
 * @param originalFile The original file object
 * @returns A new File object with sanitized name
 */
export function sanitizeFile(originalFile: File): File {
  if (!originalFile) return originalFile;
  
  // Extract the last extension only (prevents .jpg.exe attacks)
  const lastDotIndex = originalFile.name.lastIndexOf('.');
  const hasExtension = lastDotIndex !== -1;
  
  const baseName = hasExtension && lastDotIndex > 0 
    ? originalFile.name.slice(0, lastDotIndex) 
    : originalFile.name;
    
  const extension = hasExtension && lastDotIndex > 0 
    ? originalFile.name.slice(lastDotIndex + 1).toLowerCase() 
    : '';

  // Sanitize base name
  let sanitizedBaseName = baseName
    .replace(/[/\\?%*:|"<>]/g, '-') // Replace dangerous chars
    .replace(/\.\./g, '-')          // Prevent directory traversal
    .replace(/\.+/g, '-')           // Replace dots with hyphens
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/^\.+/, '')            // Remove leading dots (hidden files)
    .replace(/[^\w\-]/g, '')        // Remove non-alphanumeric chars
    .trim();

  // Limit base name length
  const MAX_LENGTH = 100;
  if (sanitizedBaseName.length > MAX_LENGTH) {
    sanitizedBaseName = sanitizedBaseName.slice(0, MAX_LENGTH);
  }
  
  // Add timestamp for uniqueness
  const timestamp = Date.now();
  
  // Sanitize extension (allow only alphanumeric)
  const sanitizedExtension = extension ? extension.replace(/[^\w]/g, '') : '';
  
  // Build the new filename
  const sanitizedName = `${sanitizedBaseName}-${timestamp}${sanitizedExtension ? `.${sanitizedExtension}` : ''}`;
  
  // Create a new File object with the sanitized name
  return new File(
    [originalFile], 
    sanitizedName,
    { type: originalFile.type }
  );
}