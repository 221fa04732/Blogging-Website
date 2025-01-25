export const hashPasswordWithSalt = async (password: string, salt: string): Promise<string> => {
    const encoder = new TextEncoder();
  
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);
  
    const key = await crypto.subtle.importKey(
      'raw',
      saltBuffer,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );
  
    const hashBuffer = await crypto.subtle.sign('HMAC', key, passwordBuffer);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;

};
  