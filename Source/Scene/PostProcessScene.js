define([
        '../Core/defineProperties',
        '../Core/destroyObject',
        './PostProcess',
        './PostProcessLibrary'
], function(
        defineProperties,
        destroyObject,
        PostProcess,
        PostProcessLibrary) {
    'use strict';

    /**
     * DOC_TBA
     * @constructor
     */
    function PostProcessScene() {
        /**
         * @inheritdoc PostProcessLibrary#blackAndWhite
         */
        this.blackAndWhite = PostProcessLibrary.blackAndWhite;
        /**
         * @inheritdoc PostProcessLibrary#brightness
         */
        this.brightness = PostProcessLibrary.brightness;
        /**
         * @inheritdoc PostProcessLibrary#eightBit
         */
        this.eightBit = PostProcessLibrary.eightBit;
        /**
         * @inheritdoc PostProcessLibrary#nightVision
         */
        this.nightVision = PostProcessLibrary.nightVision;
        /**
         * @inheritdoc PostProcessLibrary#textureOverlay
         */
        this.textureOverlay = PostProcessLibrary.textureOverlay;
        /**
         * @inheritdoc PostProcessLibrary#depthView
         */
        this.depthView = PostProcessLibrary.depthView;
        /**
         * @inheritdoc PostProcessLibrary#compositeTest
         */
        this.compositeTest = PostProcessLibrary.compositeTest;
        /**
         * @inheritdoc PostProcessLibrary#fxaa
         */
        this.fxaa = PostProcessLibrary.fxaa;

        var stages = [
            this.blackAndWhite,
            this.brightness,
            this.eightBit,
            this.nightVision,
            this.textureOverlay,
            this.depthView,
            this.compositeTest,
            this.fxaa
        ];

        this._postProcess = new PostProcess({
            stages : stages,
            overwriteInput : true,
            blendOutput : false
        });
    }

    defineProperties(PostProcessScene.prototype, {
        enabled : {
            get : function() {
                return this._postProcess.enabled;
            }
        }
    });

    /**
     * @private
     */
    PostProcessScene.prototype.execute = function(frameState, inputFramebuffer, outputFramebuffer) {
        this._postProcess.execute(frameState, inputFramebuffer, outputFramebuffer);
    };

    /**
     * @private
     */
    PostProcessScene.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * @private
     */
    PostProcessScene.prototype.destroy = function() {
        this._postProcess = this._postProcess && this._postProcess.destroy();
        return destroyObject(this);
    };

    return PostProcessScene;
});