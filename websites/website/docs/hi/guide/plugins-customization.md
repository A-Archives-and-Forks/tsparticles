# प्लगइन्स और अनुकूलन

tsParticles को कस्टम आकार, प्रीसेट और प्लगइन-संचालित सुविधाओं के साथ बढ़ाया जा सकता है।

## कस्टम आकार का उदाहरण

```ts
tsParticles.addShape("spiral", (context, particle, radius) => {
  const data = particle.shapeData as { innerRadius: number; lineSpacing: number };

  for (let i = 0; i < ((radius - data.innerRadius) / data.lineSpacing) * 10; i++) {
    const angle = 0.1 * i;
    const factor = data.innerRadius + data.lineSpacing * angle;

    context.lineTo(factor * Math.cos(angle), factor * Math.sin(angle));
  }
});
```

## कस्टम प्रीसेट उदाहरण

```ts
tsParticles.addPreset("my-preset", {
  particles: {
    move: { enable: true, speed: 2 },
    number: { value: 80 },
  },
});
```

## व्यावहारिक मार्गदर्शन

- `tsParticles.load(...)` पर कॉल करने से पहले कस्टम आकार/प्रीसेट पंजीकृत करें।
- नाम अद्वितीय रखें (प्रोजेक्ट उपसर्ग मदद करते हैं)।
- दस्तावेज़ न्यूनतम इंस्टॉल + पंजीकरण + कॉन्फ़िगरेशन स्निपेट।

## स्रोत संदर्भ

- प्लगइन इंटरफ़ेस दस्तावेज़: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
