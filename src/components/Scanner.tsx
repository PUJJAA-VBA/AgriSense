// import { useState, useRef, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Camera, Upload, Loader2, ScanLine, CheckCircle2, AlertTriangle, Leaf, Droplets, Shield, X } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { pesticideData } from "@/data/pesticideData";
// import heroFarm from "@/assets/hero-farm6.jpeg";
// import Layout from "@/components/Layout";

// type Diagnosis = {
//   crop: string;
//   healthy: boolean;
//   disease: string;
//   confidence: "Low" | "Medium" | "High";
//   severity: "None" | "Mild" | "Moderate" | "Severe";
//   symptoms: string[];
//   causes: string[];
//   treatment: { pesticide: string; dosage: string; application: string; organic_alternative: string };
//   prevention: string[];
// };

// const Scanner = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
//   const [cameraOn, setCameraOn] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const handleFile = useCallback(async (file: File) => {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload an image file");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const dataUrl = reader.result as string;
//       setPreview(dataUrl);
//       setDiagnosis(null);
//       await analyze(dataUrl, file.type, file.name);
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const analyze = async (dataUrl: string, mimeType: string, fileName?: string) => {
//   setAnalyzing(true);

//   const keywords = fileName?.toLowerCase() || "";

// let match = pesticideData.find(d =>
//   d.symptoms.toLowerCase().includes(keywords)
// );



//   try {
//     // ⏳ Fake delay
//     await new Promise(res => setTimeout(res, 2000));

//     // 🔍 Match crop using filename
//     let match = pesticideData.find(d =>
//       d.crops.some(crop =>
//         fileName?.toLowerCase().includes(crop.toLowerCase())
//       )
//     );

//     // 🔁 fallback
//     if (!match) {
//       match = pesticideData[Math.floor(Math.random() * pesticideData.length)];
//     }

//     // 🎲 Random realism
//     const confidenceLevels = ["Low", "Medium", "High"] as const;
//     const severityLevels = ["Mild", "Moderate", "Severe"] as const;

//     // ✅ Convert pesticideData → UI format
//     const diagnosis: Diagnosis = {
//       crop: match.crops[0],   // take first crop
//       healthy: false,
//       disease: match.disease,
//       confidence: confidenceLevels[Math.floor(Math.random() * 3)],
//       severity: severityLevels[Math.floor(Math.random() * 3)],

//       symptoms: [match.symptoms],
//       causes: [match.purpose || "Unknown cause"],

//       treatment: {
//         pesticide: match.pesticide,
//         dosage: match.amount,
//         application: match.timing || "As required",
//         organic_alternative: "Neem Oil", // default fallback
//       },

//       prevention: ["Regular monitoring", "Avoid overwatering"]
//     };

//     setDiagnosis(diagnosis);
//     toast.success("Analysis complete (Demo Mode)");

//   } catch (e: any) {
//     toast.error("Analysis failed");
//   } finally {
//     setAnalyzing(false);
//   }
// };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [] },
//     multiple: false,
//     onDrop: (files) => files[0] && handleFile(files[0]),
//   });

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//       streamRef.current = stream;
//       setCameraOn(true);
//       // wait for video element to mount
//       setTimeout(() => { if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); } }, 100);
//     } catch (e) {
//       toast.error("Camera access denied");
//     }
//   };

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach((t) => t.stop());
//     streamRef.current = null;
//     setCameraOn(false);
//   };

//   const capture = async () => {
//     if (!videoRef.current) return;
//     const v = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = v.videoWidth;
//     canvas.height = v.videoHeight;
//     canvas.getContext("2d")!.drawImage(v, 0, 0);
//     const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
//     stopCamera();
//     setPreview(dataUrl);
//     setDiagnosis(null);
//     await analyze(dataUrl, "image/jpeg", "camera-capture");
//   };

//   const reset = () => { setPreview(null); setDiagnosis(null); };

//   const sevTone = (s: string) =>
//     s === "Severe" ? "bg-destructive text-destructive-foreground"
//     : s === "Moderate" ? "bg-accent text-accent-foreground"
//     : s === "Mild" ? "bg-sun text-soil"
//     : "bg-leaf text-primary-foreground";

//   return (
//    <Layout>
//     <div
//   className="relative min-h-screen bg-cover bg-center"
//   style={{ backgroundImage: `url(${heroFarm})` }}
// >
//   {/* Overlay (LIGHT blur + gradient) */}
//   {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" /> */}
//   <div className="absolute inset-0 bg-black/20" />
//   {/* <div className="absolute inset-0 bg-black" /> */}
//     <div className=" relative container mx-auto px-6 py-8 space-y-8">
//       <div className="mb-8">
//         <div className="text-s uppercase tracking-widest text-accent font-extrabold">AI Disease Scanner</div>
//         <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-1 text-white ">Snap. Detect. Treat.</h1>
//         <p className="text-muted-primary mt-2 max-w-2xl text-white font-extrabold">
//           Upload, drag & drop, or capture a leaf/fruit image. Our AI identifies the disease and recommends a treatment.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Capture / Upload */}
//         <div className="organic-card p-6">
//           {!preview && !cameraOn && (
//             <>
//               <div
//                 {...getRootProps()}
//                 className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all
//                   ${isDragActive ? "border-leaf bg-leaf/5" : "border-border hover:border-leaf/60 hover:bg-muted/40"}`}
//               >
//                 <input {...getInputProps()} />
//                 <div className="w-20 h-20 rounded-3xl leaf-gradient mx-auto flex items-center justify-center mb-4 shadow-[var(--shadow-glow)]">
//                   <Upload className="w-9 h-9 text-primary-foreground" />
//                 </div>
//                 <h3 className="font-display text-xl font-extrabold mb-1 text-white font-extrabold">Drop image here</h3>
//                 <p className="text-sm text-muted-foreground text-white font-extrabold">or click to browse from your device</p>
//               </div>
//               <div className="flex items-center gap-3 my-5">
//                 <div className="flex-1 h-px bg-border" />
//                 <span className="text-xs text-muted-foreground uppercase tracking-wider text-white">or</span>
//                 <div className="flex-1 h-px bg-border" />
//               </div>
//               <Button onClick={startCamera} className="w-full rounded-2xl gap-2 h-12 font-extrabold">
//                 <Camera className="w-5 h-5" /> Open Camera
//               </Button>
//             </>
//           )}

//           {cameraOn && (
//             <div>
//               <div className="relative rounded-3xl overflow-hidden bg-black aspect-video mb-4">
//                 <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
//                 <div className="absolute inset-0 pointer-events-none border-4 border-accent/40 rounded-3xl" />
//               </div>
//               <div className="flex gap-3">
//                 <Button onClick={capture} className="flex-1 rounded-2xl h-12 gap-2 font-extrabold"><ScanLine className="w-5 h-5" /> Capture & Scan</Button>
//                 <Button onClick={stopCamera} variant="outline" className="rounded-2xl h-12"><X className="w-5 h-5" /></Button>
//               </div>
//             </div>
//           )}

//           {preview && (
//             <div>
//               <div className="relative rounded-3xl overflow-hidden mb-4">
//                 <img src={preview} alt="Crop sample" className="w-full aspect-video object-cover" />
//                 {analyzing && (
//                   <div className="absolute inset-0 bg-background/70 backdrop-blur flex flex-col items-center justify-center gap-3">
//                     <Loader2 className="w-10 h-10 animate-spin text-leaf" />
//                     <div className="font-display text-lg font-semibold">Analyzing image...</div>
//                     <div className="text-xs text-muted-foreground">Analyzing crop using smart dataset...</div>
//                   </div>
//                 )}
//               </div>
//               <Button onClick={reset} variant="outline" className="w-full rounded-2xl">Scan another image</Button>
//             </div>
//           )}
//         </div>

//         {/* Results */}
//         <div className="organic-card p-6 min-h-[400px]">
//           {!diagnosis && !analyzing && (
//             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-16">
//               <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-4">
//                 <ScanLine className="w-8 h-8" />
//               </div>
//               <p className="font-display text-lg text-white font-extrabold">Diagnosis will appear here</p>
//               <p className="text-xs mt-1 text-white font-extrabold">Capture or upload a crop image to start</p>
//             </div>
//           )}

//           {diagnosis && (
//             <div className="animate-fade-up space-y-5">
//               <div className="flex items-start justify-between gap-3 flex-wrap">
//                 <div>
//                   <div className="text-xs uppercase tracking-wider text-muted-foreground text-white">Identified crop</div>
//                   <h2 className="font-display text-3xl font-bold text-white">{diagnosis.crop}</h2>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${sevTone(diagnosis.severity)}`}>
//                   {diagnosis.severity}
//                 </span>
//               </div>

//               <div className={`p-4 rounded-2xl flex items-center text-white gap-3 ${diagnosis.healthy ? "bg-leaf/10" : "bg-destructive/10"}`}>
//                 {diagnosis.healthy
//                   ? <CheckCircle2 className="w-6 h-6 text-leaf flex-shrink-0" />
//                   : <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />}
//                 <div>
//                   <div className="font-display text-lg font-bold text-white">{diagnosis.healthy ? "Healthy plant" : diagnosis.disease}</div>
//                   <div className="text-xs text-muted-foreground text-white">Confidence: {diagnosis.confidence}</div>
//                 </div>
//               </div>

//               {diagnosis.symptoms?.length > 0 && (
//                 <Section title="Symptoms" icon={AlertTriangle} tone="text-accent">
//                   <ul className="text-sm space-y-1 list-disc pl-5">
//                     {diagnosis.symptoms.map((s, i) => <li key={i}>{s}</li>)}
//                   </ul>
//                 </Section>
//               )}

//               {!diagnosis.healthy && (
//                 <Section title="Recommended Treatment" icon={Droplets} tone="text-water">
//                   <div className="space-y-2 text-sm text-extrabold">
//                     <Field label="Pesticide" value={diagnosis.treatment.pesticide} />
//                     <Field label="Dosage" value={diagnosis.treatment.dosage} />
//                     <Field label="Application" value={diagnosis.treatment.application} />
//                     <Field label="Organic alternative" value={diagnosis.treatment.organic_alternative} />
//                   </div>
//                 </Section>
//               )}

//               {diagnosis.prevention?.length > 0 && (
//                 <Section title="Prevention" icon={Shield} tone="text-leaf">
//                   <ul className="text-sm space-y-1 list-disc pl-5">
//                     {diagnosis.prevention.map((s, i) => <li key={i}>{s}</li>)}
//                   </ul>
//                 </Section>
//               )}

//               {diagnosis.causes?.length > 0 && (
//                 <Section title="Causes" icon={Leaf} tone="text-soil">
//                   <ul className="text-sm space-y-1 list-disc pl-5">
//                     {diagnosis.causes.map((s, i) => <li key={i}>{s}</li>)}
//                   </ul>
//                 </Section>
//               )}
//             </div>
//           )}
//         </div>
//         </div>
//       </div>
//       </div>
//     </Layout>
//   );
// };

// const Section = ({ title, icon: Icon, tone, children }: any) => (
//   <div className="rounded-2xl border border-border/60 p-4 bg-card/50">
//     <div className="flex items-center gap-2 mb-2">
//       <Icon className={`w-4 h-4 ${tone}`} />
//       <h4 className="font-display font-bold">{title}</h4>
//     </div>
//     {children}
//   </div>
// );

// const Field = ({ label, value }: { label: string; value: string }) => (
//   <div>
//     <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
//     <div>{value}</div>
//   </div>
// );

// export default Scanner;