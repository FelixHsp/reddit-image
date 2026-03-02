import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { defaultData } from './types';
import type { ThreadData } from './types';
import { Cover } from './components/Cover';
import { ContentSlide } from './components/ContentSlide';
import { JSONInput } from './components/JSONInput';
import { Download } from 'lucide-react';

function App() {
  const [data, setData] = useState<ThreadData>(defaultData);
  const [isExporting, setIsExporting] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleExportAll = async () => {
    if (!coverRef.current) return;
    
    setIsExporting(true);
    const zip = new JSZip();
    
    try {
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate cover image
      const coverDataUrl = await toPng(coverRef.current, { cacheBust: true, pixelRatio: 2 });
      const coverBase64 = coverDataUrl.split(',')[1];
      zip.file('00-cover.png', coverBase64, { base64: true });

      // Generate content images
      for (let i = 0; i < data.contents.length; i++) {
        const ref = contentRefs.current[i];
        if (ref) {
          const contentDataUrl = await toPng(ref, { cacheBust: true, pixelRatio: 2 });
          const contentBase64 = contentDataUrl.split(',')[1];
          zip.file(`0${i + 1}-content-${data.contents[i].id}.png`, contentBase64, { base64: true });
        }
      }

      // Download zip
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'reddit-images.zip');
    } catch (err) {
      console.error('Failed to export images:', err);
      alert('Failed to export images. See console for details.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Hidden Container for Export - Renders full size without scaling issues */}
      <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
        <div ref={coverRef}>
          <Cover data={data} />
        </div>
        {data.contents.map((content, index) => (
          <div key={`export-${content.id}`} ref={(el) => { contentRefs.current[index] = el; }}>
            <ContentSlide content={content} index={index} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Reddit Image Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate beautiful cover and content images from Reddit threads
          </p>
        </div>

        {/* Input Section */}
        <JSONInput onDataLoaded={setData} defaultData={defaultData} />

        {/* Actions */}
        <div className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">{data.contents.length + 1}</span> images to generate
          </div>
          <button
            onClick={handleExportAll}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b0912e] text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Export All as ZIP'}
          </button>
        </div>

        {/* Preview Section - Scaled down for UI */}
        <div className="w-full max-w-7xl overflow-x-auto pb-12">
          <div className="flex gap-8 items-start min-w-max px-4">
            {/* Cover Preview */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="font-semibold text-gray-700">Cover</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transform origin-top left" style={{ transform: 'scale(0.4)', height: '426px', width: '320px', marginBottom: '-640px', marginRight: '-480px' }}>
                <div>
                  <Cover data={data} />
                </div>
              </div>
            </div>

            {/* Content Previews */}
            {data.contents.map((content, index) => (
              <div key={content.id} className="flex flex-col items-center gap-4">
                <h3 className="font-semibold text-gray-700">Slide {index + 1}</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transform origin-top left" style={{ transform: 'scale(0.4)', height: '426px', width: '320px', marginBottom: '-640px', marginRight: '-480px' }}>
                  <div>
                    <ContentSlide 
                      content={content} 
                      index={index} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
