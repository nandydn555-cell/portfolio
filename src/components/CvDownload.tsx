import { useRef } from 'react';
import { Download, X } from 'lucide-react';

const cvFilename = 'nandin-erdene-cv.pdf';

export function CvDownload() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-[#b981a1] bg-[#fff9f8] px-5 py-2.5 text-sm font-semibold text-[#51233f] hover:bg-[#eedbe7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#713b63]"
      >
        <Download className="size-4" aria-hidden="true" />
        CV татах
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="cv-dialog-title"
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-auto rounded-[1.25rem] bg-transparent p-0 backdrop:bg-[#2b1820]/50"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="contact-modal-paper p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="cv-dialog-title" className="display-heading text-3xl text-[#472b39]">
              CV татах
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="CV цонхыг хаах"
              className="contact-modal-close"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <a
            href={`/cv/${cvFilename}`}
            download={cvFilename}
            className="contact-btn inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Download className="size-4" aria-hidden="true" />
            PDF татах
          </a>
        </div>
      </dialog>
    </>
  );
}
