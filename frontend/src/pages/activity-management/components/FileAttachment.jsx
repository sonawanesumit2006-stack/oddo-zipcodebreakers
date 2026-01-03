import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const FileAttachment = ({ attachments, onAttachmentsChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const newAttachments = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      name: file?.name,
      size: (file?.size / 1024)?.toFixed(2),
      type: file?.type
    }));
    onAttachmentsChange([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    onAttachmentsChange(attachments?.filter(att => att?.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-smooth ${
          dragActive
            ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground/30'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-muted rounded-full">
              <Icon name="Upload" size={24} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                PDF, JPG, PNG, DOC (max 10MB each)
              </p>
            </div>
          </div>
        </label>
      </div>
      {attachments?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Attached Files ({attachments?.length})</h4>
          <div className="space-y-2">
            {attachments?.map((attachment) => (
              <div
                key={attachment?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon name="File" size={20} color="var(--color-primary)" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {attachment?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{attachment?.size} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="flex-shrink-0 p-1 hover:bg-destructive/10 rounded transition-smooth"
                >
                  <Icon name="X" size={16} color="var(--color-destructive)" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileAttachment;